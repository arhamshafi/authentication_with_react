const express = require("express")
const { Register, LoginUser } = require("../controller/authController")
const router = express.Router()

router.post("/register" , Register )
router.post("/getUser" , LoginUser )

module.exports = router
