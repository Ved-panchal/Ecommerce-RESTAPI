const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const createJWT = (payload)=>{
    const token = jwt.sign(payload , process.env.JWT_SECRET ,{expiresIn : "1d"});
    return token
}

const verifyJWT = (token)=>{
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    return decoded
}

module.exports = {verifyJWT,createJWT}