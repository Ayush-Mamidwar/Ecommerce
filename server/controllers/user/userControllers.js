const cloudinary = require('../../cloudinary/cloudinary')
const userdb = require('../../model/user/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY_GENERAL
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const {transporter} = require('../../helper')
const userContactDB = require('../../model/user/userContactModel')


const UserRegister = async(req,res)=>{

    const {firstname,lastname,email,password,confirmpassword,} = req.body

    if(!firstname || !lastname || !email || !password || !confirmpassword || !req.file){
        res.status(400).json({error:"all fields are required"})
    }

    const file = req.file?.path;
    const upload = await cloudinary.uploader.upload(file)

    try{
        const preuser = await userdb.findOne({email})

        if(preuser){
            res.status(400).json({error:"User Already exists"})
        }else if(password !== confirmpassword){ 
            res.status(400).json({error:"password do not match"})
        }else{
            const userData = new userdb({firstname,lastname,email,password,userprofile:upload.secure_url})
            await userData.save()
            res.status(200).json(userData)
        }

    }catch(error){
        res.status(400).json(error)
    }
}


const Login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400).json({error:"all fields requried"})
    }

    try {
        const userValid = await userdb.findOne({email})
        if(userValid){
            //bcrypt.compare returns true or false
            const isMatch = await bcrypt.compare(password,userValid.password);
            
            if(!isMatch){//user entered wrong password
                res.status(400).json({error:"Invalid Details"})
            }
            else{
                //token generate
                const token = await userValid.generateAuthToken()

                const result = {
                    userValid,
                    token
                }
                res.status(200).json(result)
            }
        }else{
            res.status(400).json({error:"Invalid Details"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

const UserVerify = async(req,res)=>{
    try {
        
        const verifyUser = await userdb.findOne({_id:req.userId})
        res.status(200).json(verifyUser)
    } catch (error) {
        res.status(400).json(error)
    }
}

const Logout = async(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currentElement)=>{return currentElement.token !== req.token})
        await req.rootUser.save()
        //console.log(req.rootUser)

        res.status(200).json({message:"User Successfully Logged Out"})
     } catch (error) {
        res.status(400).json(error)
     }
}

const ForgotPassword = async(req,res)=>{
    try {
        const {email} = req.body
        if(!email){
            res.status(400).json({error:"Enter Email Id"})
        }
        const isUser = await userdb.findOne({email})
        
        if(isUser){
            //token generate for password change
            const token = jwt.sign({_id:isUser._id},SECRET_KEY,{
                expiresIn:"300s"      //valid for 5 mins
            })
            const setusertoken = await userdb.findByIdAndUpdate({_id:isUser._id},{verifytoken:token},{new:true})
        
            //join email path
            const emailTemplatePath = path.join(__dirname,"../../emailtemplate/forgotTemplate.ejs")
            const emailTemplateRead = fs.readFileSync(emailTemplatePath,"utf-8");
            
            //set token and logo value in ejs file

            const data = {
                passwordresetlink:`http://localhost:3000/resetpassword/${isUser.id}/${setusertoken.verifytoken}`,
                logo:"https://cdn-icons-png.flaticon.com/128/732/732200.png"
            }

            //set dynamic data value in ejs
            const renderTemplate = ejs.render(emailTemplateRead,data)
            if(setusertoken){
                const mailOptions = {
                    from:"ayushmamidwar95@gmail.com",
                    to:email,
                    subject:"Sending Email For Password Reset",
                    html:renderTemplate
                }
                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        res.status(400).json({error:"Email Not Sent"})
                    }
                    else{
                        res.status(200).json({message:"Email Sent Successfully"})
                    }
                })
            }
        }else{
            
            res.status(400).json({error:"User Does Not Exist."})
        }

    } catch (error) {
        res.status(400).json(error)
    }
}

const ForgotPasswordVerify = async(req,res)=>{
    const {id,token} = req.params;

    try{
        const validUser = await userdb.findOne({_id:id,verifytoken:token})

        const verifytoken = jwt.verify(token,SECRET_KEY)
        if(validUser && verifytoken._id){
            res.status(200).json({message:"Valid User"})
        }else{
            res.status(400).json({error:"user not exists"})
        }
    }catch(error){
        res.status(400).json(error)
    }
}

const ResetPassword = async(req,res)=>{
    const {id,token} = req.params;
    const {password} = req.body;
    try {
        const validUser = await userdb.findOne({_id:id,verifytoken:token})

        const verifytoken = jwt.verify(token,SECRET_KEY)
        if(validUser && verifytoken._id){
            const newPassword = await bcrypt.hash(password,12)
            const setNewPassword = await userdb.findByIdAndUpdate({_id:id},{password:newPassword},{new:true})
            
            await setNewPassword.save()
            res.status(200).json({message:"Password Successfully Updated"})
        }else{
            res.status(400).json({error:"Session Expired, Please Try Again"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

const GetAllUsers = async(req,res)=>{
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 4;
    try {
        const skip = (page-1)*ITEM_PER_PAGE
        const count = await userdb.countDocuments()
        const pageCount = Math.ceil(count/ITEM_PER_PAGE)
 
        const usersData = await userdb.find().limit(ITEM_PER_PAGE).skip(skip).sort({_id:-1})

        
        res.status(200).json({
        Pagination:{
            count,pageCount
        },usersData})
    } catch (error) {
        res.status(400).json(error)
    }
}

const DeleteUser = async(req,res)=>{
    const {userid} = req.params
    try {
        const deleteuser = await userdb.findByIdAndDelete({_id:userid})
        res.status(200).json(deleteuser)
    } catch (error) {
        res.status(400).json(error)
    }
}

const UserContact = async(req,res)=>{
    const {name,email,message} = req.body
    if(!name || !email || !message){
        res.status(400).json({error:"All fields are required."})
    }

    try{
        const usermessageData = new userContactDB({name,email,message})
        await usermessageData.save()
        res.status(200).json(usermessageData)  
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports = {UserRegister,Login,UserVerify,Logout,
    ForgotPassword,ForgotPasswordVerify,ResetPassword,GetAllUsers,DeleteUser,UserContact}