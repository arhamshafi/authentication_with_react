
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email Must Be Required"],
        unique: [true, "This Email is Already exists"]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    verified: {
        type: String,
        default: "no",
        enum: ["no", "yes"]
    },
    selectedCourses: {
        type: [String],
        default: []
    },
    documents: {
        qualification: { type: String, default: "" },
        idCard: { type: String, default: "" },
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return 
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("USER", userSchema)
module.exports = User