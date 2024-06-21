const jwt = require("jsonwebtoken")

const createJWT = (payload)=>{
    const token = jwt.sign(payload , "secret" ,{expiresIn : "1d"});
    return token
}

const verifyJWT = (token)=>{
    const decoded = jwt.verify(token , "secret");
    return decoded
}

module.exports = {verifyJWT,createJWT}