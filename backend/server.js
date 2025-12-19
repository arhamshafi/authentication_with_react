const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const ConnectDB = require("./config/mongo")
const errorHandler = require("./middleware/errorHandler")
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/user")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/studentdata/auth", authRoutes)
app.use("/studentdata/admin", adminRoutes)
app.use("/studentdata/user" , userRoutes)

ConnectDB()

app.use(errorHandler)
app.listen(process.env.PORT || 5656, () => {
    console.log("server is runnig on port : ", process.env.PORT);
})