const express = require("express")
const Auth = require("../middleware/protector")
const { AddCourses, DelCourse, UpdateCourse } = require("../controller/admin")

const router = express.Router()

router.use(Auth)
router.post("/add", AddCourses)
router.post("/del", DelCourse)
router.put("/update/:id", UpdateCourse)

module.exports = router

