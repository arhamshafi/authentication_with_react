import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    skills: { type: [String] }
})

const Course = mongoose.model("Course", courseSchema)
export default Course