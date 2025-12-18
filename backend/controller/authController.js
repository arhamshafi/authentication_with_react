const jwt = require("jsonwebtoken")
const User = require("../model/user")
const bcrypt = require("bcrypt")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "3h" })
}


module.exports.Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const existingUSer = await User.findOne({ email })
        if (existingUSer) return res.status(400).json({ message: "User Already Exist", success: false })
        const newUser = await User.create({ name, email, password })
        const token = generateToken(newUser._id)
        res.status(200).json({ user: { name: newUser.name, email: newUser.email, role: newUser.role }, message: "Successfully Created", token, success: true })

    } catch (err) {
        next(err)
    }
}

module.exports.LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const logUser = await User.findOne({ email })
        if (!logUser) return res.status(400).json({ message: "Invalid Email or Pass", success: false })
        const isMatch = await bcrypt.compare(password, logUser.password)
        if (!isMatch) return res.status(400).json({ message: "Inavalid Email or Pass", success: false })
        const token = generateToken(logUser._id)
        res.status(200).json({ user: { name: logUser.name, email: logUser.email, role: logUser.role }, token, message: "Successfully Loged", success: true })

    } catch (err) {
        next(err)
    }
}