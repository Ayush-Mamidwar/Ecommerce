const express = require('express')
const router = express.Router()
const {Register,Login,AdminVerify,Logout} = require('../../controllers/admin/adminControllers')
const adminUpload = require('../../multerconfig/admin/adminStorageConfig')
const adminAuthenticate = require('../../middleware/admin/adminAuthenticate')

//admin auth routes

router.post('/register',adminUpload.single("admin_profile"),Register)
router.post('/login',Login)
router.get("/logout",adminAuthenticate,Logout)

//admin verify
router.get("/adminverify",adminAuthenticate,AdminVerify)


module.exports = router