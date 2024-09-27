const mongoose = require('mongoose')

const userContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true})

const userContactDB = new mongoose.model('usercontact',userContactSchema)
module.exports = userContactDB