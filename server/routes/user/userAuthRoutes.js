const express = require('express')
const router = express.Router()
const userUpload = require('../../multerconfig/user/userStorageConfig')
const {UserRegister,Login,UserVerify,Logout,ForgotPassword,
    ForgotPasswordVerify,ResetPassword,GetAllUsers,DeleteUser,UserContact} = require('../../controllers/user/userControllers')
const userAuthenticate = require('../../middleware/user/userAuthenticate')
const adminAuthenticate = require('../../middleware/admin/adminAuthenticate')


//user auth routes
router.post("/register",userUpload.single("userprofile"),UserRegister)
router.post("/login",Login)


router.get("/userloggedin",userAuthenticate,UserVerify)
router.get("/logout",userAuthenticate,Logout)

router.post('/forgotpassword',ForgotPassword)

//forgot password verification
router.get('/forgotpassword/:id/:token',ForgotPasswordVerify)

router.put('/resetpassword/:id/:token',ResetPassword)

//for contact api
router.post('/usercontact',userAuthenticate,UserContact);


//for admin
router.get('/getallusers',adminAuthenticate,GetAllUsers)
router.delete('/userdelete/:userid',adminAuthenticate,DeleteUser)

module.exports = router