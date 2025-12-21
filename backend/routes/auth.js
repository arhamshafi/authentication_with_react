// routes/authRoutes.js

const express = require('express')
const router = express.Router()
const { Register, LoginUser, VerifyEmail, ResendVerificationEmail, Logout } = require("../controller/authController")
const Auth = require("../middleware/protector")

// Public routes
router.post('/register', Register)
router.post('/getUser', LoginUser)
router.get('/verify-email/:token', VerifyEmail)
router.post('/resend-verification', ResendVerificationEmail)

// Protected route - requires token
router.post('/logout', Auth, Logout)

module.exports = router