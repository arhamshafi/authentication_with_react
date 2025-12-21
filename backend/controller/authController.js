const jwt = require("jsonwebtoken")
const User = require("../model/user")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const { sendVerificationEmail } = require("../utils/emailService")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "3h" })
}

const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex')
}

module.exports.Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exist", success: false })
        }
        const verificationToken = generateVerificationToken()
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000)
        const newUser = await User.create({
            name,
            email,
            password,
            verificationToken,
            verificationTokenExpiry: tokenExpiry
        })

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`

        try {
            await sendVerificationEmail(email, name, verificationLink)
            console.log('✅ Verification email sent to:', email)
        } catch (emailError) {
            console.error('❌ Email sending failed:', emailError.message)
            console.log('🔗 Verification Link:', verificationLink)
        }

        res.status(200).json({
            message: `Verification Code Sent to ${newUser.email} Please Verify it`,
            success: true,
            emailSent: true
        })
    } catch (err) {
        console.error('Registration error:', err)
        next(err)
    }
}
module.exports.LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const logUser = await User.findOne({ email })
        if (!logUser) {
            return res.status(400).json({
                message: "Invalid Email or Password",
                success: false
            })
        }

        const isMatch = await bcrypt.compare(password, logUser.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password",
                success: false
            })
        }

        if (logUser && !logUser.emailVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in",
                success: false,
                emailVerified: false,
            })
        }

        const token = generateToken(logUser._id)

        res.cookie("userToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 3 * 60 * 60 * 1000
        })
        res.status(200).json({
            user: {
                name: logUser.name,
                email: logUser.email,
                role: logUser.role
            },
            token,
            message: "Successfully Logged In",
            success: true,
            emailVerified: logUser.emailVerified
        })
    } catch (err) {
        console.error('Login error:', err)
        next(err)
    }
}
module.exports.VerifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired verification link",
                success: false
            })
        }

        user.emailVerified = true
        user.verificationToken = null
        user.verificationTokenExpiry = null
        await user.save()

        const authToken = generateToken(user._id)

        res.cookie("userToken", authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 3 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Email verified successfully! You are now logged in.",
            success: true,
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        console.error('Verification error:', err)
        next(err)
    }
}
module.exports.ResendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        if (user.emailVerified) {
            return res.status(400).json({
                message: "Email is already verified",
                success: false
            })
        }

        const verificationToken = generateVerificationToken()
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000)

        user.verificationToken = verificationToken
        user.verificationTokenExpiry = tokenExpiry
        await user.save()

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`

        try {
            await sendVerificationEmail(user.email, user.name, verificationLink)
            console.log('✅ Verification email resent to:', user.email)
        } catch (emailError) {
            console.error('❌ Email sending failed:', emailError.message)
            console.log('🔗 Verification Link:', verificationLink)
        }

        res.status(200).json({
            message: "Verification email sent successfully!",
            success: true
        })
    } catch (err) {
        console.error('Resend verification error:', err)
        next(err)
    }
}
module.exports.Logout = async (req, res, next) => {
    try {
        res.clearCookie('userToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        })

        res.status(200).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (err) {
        console.error('Logout error:', err)
        next(err)
    }
}