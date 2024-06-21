const {UserModel} = require("../models/userModel.js")
const { createJWT  } = require( "../utils/tokenUtils.js");

const { hashPassword  , comparePassword} = require( "../utils/passwordUtils.js")

const register = async (req , res)=>{
    req.body.password = await hashPassword(req.body.password);
   
    const user =await UserModel.create(req.body)
    res.status(200).json({msg : "Register Successfully" , userInfo : user})
}



const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) throw new Error('User is not registered');
      
        const isPasswordCorrect = await comparePassword(req.body.password , user.password);
        if (!isPasswordCorrect) throw new Error('Invalid password..');
        const token  = createJWT({userId : user._id })
        res.status(200).json({msg : "Login Successfully " , userInfo:user , token : token})
        
    } catch (error) {
        res.status(400).json({ msg: error.message , error:"Something ocucur while finding email" });
        
    }
};



module.exports = {login,register}