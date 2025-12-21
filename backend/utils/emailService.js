const nodemailer = require('nodemailer')

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendVerificationEmail = async (email, name, verificationLink) => {
    const mailOptions = {
        from: "AR-Tech Sppourt Team",
        to: email,
        subject: 'Verify Your Email Address',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    .content {
                        background-color: white;
                        padding: 30px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 30px;
                        background-color: #2563eb;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-size: 12px;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <h2>Welcome, ${name}!</h2>
                        <p>Thank you for registering. Please verify your email address to complete your registration.</p>
                        <p>Click the button below to verify your email:</p>
                        <div style="text-align: center;">
                            <a href="${verificationLink}" class="button" style="color:white" >Verify Email</a>
                        </div>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #2563eb;">${verificationLink}</p>
                        <p><strong>Note:</strong> This link will expire in 15 minutes.</p>
                        <p>If you didn't create an account, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log('Verification email sent successfully')
    } catch (error) {
        console.error('Error sending verification email:', error)
        throw error
    }
}

module.exports = { sendVerificationEmail }