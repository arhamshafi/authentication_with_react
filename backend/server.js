require("dotenv").config()
const express = require("express")
const cors = require("cors")
const ConnectDB = require("./config/mongodb")

const app = express()

app.use(cors())
app.use(express.json())

ConnectDB()

app.listen(process.env.PORT || 6548, () => {
  console.log("server is running on port:", process.env.PORT)
})
