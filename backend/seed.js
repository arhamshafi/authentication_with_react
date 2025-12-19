const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Course = require("./model/course")

dotenv.config()

const courses = [
    {
        title: "Full Stack Web Development",
        description: "Learn complete web development from frontend to backend using modern technologies.",
        duration: "6 Months",
        skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB"]
    },
    {
        title: "Frontend Development with React",
        description: "Master frontend development using React, hooks, and modern UI practices.",
        duration: "3 Months",
        skills: ["HTML", "CSS", "JavaScript", "React", "Redux", "API Integration"]
    },
    {
        title: "Backend Development with Node.js",
        description: "Build secure and scalable backend APIs using Node.js and Express.",
        duration: "3 Months",
        skills: ["Node.js", "Express", "MongoDB", "JWT", "REST API"]
    },
    {
        title: "JavaScript Mastery",
        description: "Deep dive into JavaScript from basics to advanced concepts.",
        duration: "2 Months",
        skills: ["JavaScript", "ES6", "DOM", "Async Programming", "Debugging"]
    },
    {
        title: "React + Vite Bootcamp",
        description: "Fast and modern React development using Vite and best practices.",
        duration: "2 Months",
        skills: ["React", "Vite", "Hooks", "Component Design", "State Management"]
    },
    {
        title: "MERN Stack Development",
        description: "Become a MERN stack developer by building real-world applications.",
        duration: "6 Months",
        skills: ["MongoDB", "Express", "React", "Node.js", "Authentication"]
    },
    {
        title: "UI/UX Design for Developers",
        description: "Learn modern UI/UX principles to create user-friendly designs.",
        duration: "1 Month",
        skills: ["UI Design", "UX Principles", "Figma", "Color Theory", "Typography"]
    },
    {
        title: "REST API Development",
        description: "Learn how to design and develop RESTful APIs from scratch.",
        duration: "1.5 Months",
        skills: ["REST API", "HTTP Methods", "Postman", "Node.js", "Express"]
    },
    {
        title: "Database Design with MongoDB",
        description: "Learn MongoDB schema design, queries, and performance optimization.",
        duration: "2 Months",
        skills: ["MongoDB", "Mongoose", "Indexes", "Aggregation", "Data Modeling"]
    },
    {
        title: "Authentication & Authorization",
        description: "Implement secure authentication and role-based authorization.",
        duration: "1 Month",
        skills: ["JWT", "Authentication", "Authorization", "Middleware", "Security"]
    }
]

// Seed function
const seedCourses = async () => {
    try {
        mongoose.connect(process.env.MONGOURL).then(() => {
            console.log("mongo DB get connected");
        })

        await Course.deleteMany()
        console.log("Existing Courses Deleted")

        await Course.insertMany(courses)
        console.log("New Courses Inserted")

        process.exit()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

// Run seed
seedCourses()
