const express = require("express")
const Auth = require("../middleware/protector")
const { AddCourses } = require("../controller/admin")

const router = express.Router()

router.use(Auth)
router.post("/add", AddCourses)

module.exports = router

