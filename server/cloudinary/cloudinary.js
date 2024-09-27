const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:"cloud_name",
    api_key:"Your_API_Key",
    api_secret:"Your_API_Secret"
})

module.exports = cloudinary
