const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const ConnectDB = require("./config/mongo")
const errorHandler = require("./middleware/errorHandler")
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/user")
const AIroute = require("./routes/aichat")

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
    ],
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())


app.use("/studentdata/auth", authRoutes)
app.use("/studentdata/admin", adminRoutes)
app.use("/studentdata/user", userRoutes)
app.use("/studentdata/ai", AIroute)

ConnectDB()

app.use(errorHandler)
app.listen(process.env.PORT || 5656, () => {
    console.log("✅ Server is running on port:", process.env.PORT || 5656);
})