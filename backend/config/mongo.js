const mongoose = require("mongoose")

const ConnectDB = async () => {
    mongoose.connect(process.env.MONGOURL).then(() => {
        console.log("mongo DB get connected");
    })
}

module.exports = ConnectDB