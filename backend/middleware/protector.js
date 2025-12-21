const jwt = require("jsonwebtoken")


const Auth = async (req, res, next) => {
    try {
        const token = req.cookies.userToken

        if (!token) {
            return res.status(401).json({ message: "Token is Missing", success: false, authStatus: "NO_TOKEN" })
        }
        // console.log("Auth Token : ", token);
        const decoded = jwt.verify(token, process.env.SECRETKEY)
        if (!decoded) return res.status(401).json({ message: "InvaliD Token", success: false, authStatus: "INVALID" })
        req.user = decoded.id
        next()

    } catch (err) {
        next(err)
    }
}
module.exports = Auth