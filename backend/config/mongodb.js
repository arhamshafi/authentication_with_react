const mongoose = require("mongoose")

const ConnectDB = async () => {
    mongoose.connect(process.env.MOGOURL).then(() => {
        console.log("mongo get connect");

    })
}

module.exports = ConnectDB