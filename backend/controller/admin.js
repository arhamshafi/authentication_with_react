const Course = require("../model/course");
const User = require("../model/user");

module.exports.AddCourses = async (req, res, next) => {
    try {
        const crnt_user = await User.findById(req.user)
        if (!crnt_user || crnt_user.role !== "admin") return res.status(401).json({ message: "User Not Allowed", success: false })
        const { title, duration, description, skill } = req.body
        const skillArray = skill.split(",").map(s => s.trim())
        const detail = await Course.create({
            title, description, duration, skills: skillArray
        })
        res.status(200).json({ message: "Course Details Added Successfully", success: true })
    } catch (err) {
        next(err)
    }
}

module.exports.DelCourse = async (req, res, next) => {
    try {
        const { _id } = req.body
        const crntUser = await User.findById(req.user)
        if (!crntUser || crntUser.role !== "admin") return res.status(401).json({ message: "User Not Allowed", success: false })
        const item = await Course.findByIdAndDelete(_id)
        res.status(200).json({ message: "Successfully Delete", success: true })
    } catch (err) {
        next(err)
    }
}

module.exports.UpdateCourse = async (req, res, next) => {
    try {
        const { id } = req.params
        const crntUser = await User.findById(req.user)
        if (crntUser.role !== "admin") return res.status(401).json({ message: "Users Not Allowed", success: false })
        const { title, duration, description, skill } = req.body
        const skillarray = skill.split(",")

        const updatedItem = await Course.findByIdAndUpdate(
            id,
            { title, description, duration, skills: skillarray },
            { new: true }
        )
        if (!updatedItem) return res.status(404).json({ message: "Course not found", success: false })
        res.status(200).json({ message: "Successfully Updated", success: true })

    } catch (err) {
        next(err)
    }
}