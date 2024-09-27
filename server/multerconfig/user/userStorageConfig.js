const multer = require('multer')


// storage config
const storage = multer.diskStorage({
    //specifying path where the images should be stored
    destination:(req,file,callback)=>{
        callback(null,"./useruploads")
    },
    //specifying filename with which the image should be stored
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
})

//filter
const fileFilter = (req,file,callback)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("Only png,jpg,hpeg image format are allowed"))
    }
}

const userupload = multer({
    storage:storage,
    fileFilter: fileFilter
})

module.exports = userupload