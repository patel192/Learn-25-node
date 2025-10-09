const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../utiles/Cloudinary")
const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"PROFILE_PICS",
        allowed_formats:["jpg","png","jpeg"]
    }
})
const upload = multer({storage})
module.exports = upload