module.exports.AddCourses = async (req, res, next) => {
    try {
        const { title, duration, description, skill } = req.body
        console.log(req.body, "req.body here !!!");

        return 
    } catch (err) {
        next(err)
    }
}