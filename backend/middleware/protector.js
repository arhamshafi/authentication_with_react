const jwt = require("jsonwebtoken")

const Auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token missing or malformed" })
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRETKEY)
        req.user = decoded
        next()
    } catch (err) {
        console.log(err.message)
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

module.exports = Auth
