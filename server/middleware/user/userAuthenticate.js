const userdb = require('../../model/user/userModel')
const jwt = require('jsonwebtoken')
const SECERET_KEY = process.env.SECERET_KEY_USER

const userAuthenticate = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        
        const verifyToken = jwt.verify(token,SECERET_KEY)
        
        const user = await userdb.findOne({_id:verifyToken._id})
        
        if(!user){
            throw new Error("User not found")
        }
        req.token = token
        req.rootUser = user
        req.userId = user._id         //this value will be stored as object
        req.userMainId = user.id      //this value will be stored as string
        next()
    }catch(error){
        res.status(400).json({error:"Unauthorized No token provided"})
    }
}

module.exports = userAuthenticate