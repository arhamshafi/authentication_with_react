const express = require("express")
const router = express.Router()
const { AIACt } = require("../controller/ai")

router.post("/chat", AIACt)

module.exports = router