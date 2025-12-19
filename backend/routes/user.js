const express = require("express")
const { FetchCourse, MyAcc, SelectedCourses, UpdateProfile, DeleteCourse } = require("../controller/user")
const Auth = require("../middleware/protector")
const router = express.Router()

router.get("/getDetails", FetchCourse)
router.post("/me/:email", MyAcc)
router.post("/selectedCourse", Auth, SelectedCourses)
router.put("/updateProfile", Auth, UpdateProfile)
router.delete("/:id", Auth, DeleteCourse)

module.exports = router