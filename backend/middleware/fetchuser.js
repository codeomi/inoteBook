const jwt = require('jsonwebtoken')
const JWT_SECRET = "OmJWTsign7890"

const fetchuser = (req, res, next) => {
    //GET USER FROM JWT TOKEN AND ADD ID TO REQ OBJECT
    const token = req.header("auth-token")
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token." })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token." })
    }
    next()
}

module.exports = fetchuser