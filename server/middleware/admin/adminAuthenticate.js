const adminDB = require('../../model/admin/adminModel')
const jwt = require('jsonwebtoken')
const SECERET_KEY = process.env.SECERET_KEY_ADMIN


const adminAuthenticate = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        
        const verifyToken = jwt.verify(token,SECERET_KEY)
        
        const rootUser = await adminDB.findOne({_id:verifyToken._id})
        
        if(!rootUser){
            throw new Error("User not found")
        }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id
        next()
    }catch(error){
        res.status(400).json({error:"Unauthorized No token provided"})
    }
}

module.exports = adminAuthenticate