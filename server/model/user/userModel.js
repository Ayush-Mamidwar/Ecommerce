const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECERET_KEY = process.env.SECERET_KEY_USER


//user schema
const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        requried:true,
    },
    lastname:{
        type:String,
        requried:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter a valid Email Id.")
            }
        }
    },
    userprofile:{
        type:String,
        requried:true,
    },
    password:{
        type:String,
        requried:true,
    },
    tokens:[
        {
            token:{
                type: String,
                required: true,
            }
        }
    ],
    //for forgot password verification token
    verifytoken:{
        type:String
    }
},{timestamps:true})

//hash password
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})


//generate token
userSchema.methods.generateAuthToken = async function(){
    try{
        let newToken = jwt.sign({_id:this._id},SECERET_KEY,{
            expiresIn: "3d",
        })

        this.tokens = this.tokens.concat({token:newToken})

        await this.save()
        return newToken;
    }catch(error){
        res.status(400).json(error)
    }
}


//user model
const userdb = new mongoose.model("usersDbs",userSchema)

module.exports=  userdb