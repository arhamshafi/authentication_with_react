const Course = require("../model/course")
const User = require("../model/user")

module.exports.FetchCourse = async (req, res, next) => {
    try {
        const courseDetails = await Course.find()
        res.status(200).json({ success: true, details: courseDetails })
    } catch (err) {
        next(err)
    }
}
module.exports.MyAcc = async (req, res, next) => {
    try {
        const { email } = req.params
        const crnt = await User.findOne({ email })
        if (!crnt) return res.status(400).json({ message: "User Not Found", success: false })
        res.status(200).json({ message: "Successfully Get User", success: true, crnt })
    } catch (err) {
        next(err)
    }
}
module.exports.SelectedCourses = async (req, res, next) => {
    try {
        const crnt = await User.findById(req.user)
        if (!crnt) return res.status(401).json({ message: "User Not Found", success: false })
        if (crnt && !crnt.verified) return res.status(400).json({ message: "Verify Your Profile", success: false })
        crnt.selectedCourses = req.body
        await crnt.save()
        res.status(200).json({ message: "Course selected", success: true })
    } catch (err) {
        next(err)
    }
}

module.exports.UpdateProfile = async (req, res, next) => {
    try {
        const crntUser = await User.findById(req.user)
        if (!crntUser) return res.status(401).json({ message: "User Not Found", success: false })
        crntUser.name = req.body.name
        crntUser.documents.qualification = req.body.qualification
        crntUser.documents.idCard = req.body.idCard

        if (crntUser.documents.qualification && crntUser.documents.idCard) {
            crntUser.verified = true
        }
        await crntUser.save()
        res.status(200).json({ success: true, message: "Successfully Updated", user: { email: crntUser.email, name: crntUser.name, role: crntUser.role } })
    } catch (err) {
        next(err)
    }
}

module.exports.DeleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params
        const crnt = await User.findById(req.user)
        if (!crnt) return res.status(401).json({ success: false, message: "User Not Found" })
        const filter = crnt.selectedCourses.filter(ele => ele.toString() !== id)
        crnt.selectedCourses = filter
        await crnt.save()
        res.status(200).json({ message: "Delete Successfully", success: true })

    } catch (err) {
        next(err)
    }
}