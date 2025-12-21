const express = require("express")
const { FetchCourse, SelectedCourses, UpdateProfile, DeleteCourse, GetMe } = require("../controller/user")
const Auth = require("../middleware/protector")
const router = express.Router()

router.get("/getDetails", FetchCourse)
router.post("/selectedCourse", Auth, SelectedCourses)
router.put("/updateProfile", Auth, UpdateProfile)
router.delete("/:id", Auth, DeleteCourse)
router.get("/getme", Auth, GetMe)



module.exports = router