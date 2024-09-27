const adminDB = require('../../model/admin/adminModel')
const cloudinary = require('../../cloudinary/cloudinary')
const bcrypt = require('bcryptjs')

//register
const Register =  async(req,res)=>{
    const {name,email,mobile,password,confirmpassword} = req.body

    if(!name || !email || !mobile || !password || !req.file){
        res.status(400).json({error:"all fields are required"})
    }

    const file = req.file?.path;
    const upload = await cloudinary.uploader.upload(file)

    try{
        const preuser = await adminDB.findOne({email})
        const mobileVerification = await adminDB.findOne({mobile})

        if(preuser){
            res.status(400).json({error:"admin already exists"})
        }else if(mobileVerification){
            res.status(400).json({error:"contact number already exists"})
        } else if(password !== confirmpassword){
            res.status(400).json({error:"password and confirm password dows not match"})
        }
        else{
            const adminData = new adminDB({name,email,mobile,password,profile:upload.secure_url})
            await adminData.save()
            res.status(200).json(adminData)
        }

    }catch(error){
        res.status(400).json(error)
    }
}


//login 
const Login =  async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        res.status(400).json({error:"all fields requried"})
    }


    try{
        const adminValid = await adminDB.findOne({email})
        if(adminValid){
            //bcrypt.compare returns true or false
            const isMatch = await bcrypt.compare(password,adminValid.password);
            
            if(!isMatch){//user entered wrong password
                res.status(400).json({error:"Invalid Details"})
            }
            else{
                //token generate
                const token = await adminValid.generateAuthToken()

                const result = {
                    adminValid,
                    token
                }
                res.status(200).json(result)
            }
        }else{
            res.status(400).json({error:"Invalid Details"})
        }
    }
    catch(error){
        res.status(400).json(error)
    }   
}

//verify admin
const AdminVerify = async(req,res)=>{
    try{
        const verifyAdmin =  await adminDB.findOne({_id:req.userId})
        res.status(200).json(verifyAdmin)
    }catch(error){
        res.status(400).json(error)
    }
}

//logout admin
const Logout = async(req,res)=>{

     try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currentElement)=>{return currentElement.token !== req.token})
        await req.rootUser.save()

        res.status(200).json({message:"Admin Successfully Logged Out"})
     } catch (error) {
        res.status(400).json(error)
     }
}
module.exports = {Register,Login,AdminVerify,Logout}