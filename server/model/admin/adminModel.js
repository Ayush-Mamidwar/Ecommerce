const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECERET_KEY = process.env.SECERET_KEY_ADMIN

//defining schema means defining structure of our collection in mongodb
const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
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
    profile:{
        type:String,
        required: true
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    password:{
        type:String,
        required: true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true,
            }
        }
    ]

})

//password hashing
adminSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

//token generation
adminSchema.methods.generateAuthToken = async function(){
    try{
        let newToken = jwt.sign({_id:this._id},SECERET_KEY,{
            expiresIn: "1d",
        })

        this.tokens = this.tokens.concat({token:newToken})

        await this.save()
        return newToken;
    }catch(error){
        res.status(400).json(error)
    }
}

//model
const adminDB = new mongoose.model("admin",adminSchema)

module.exports = adminDB