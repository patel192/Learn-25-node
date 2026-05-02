const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utiles/Cloudinary");

/**
 * --- FILE UPLOAD MIDDLEWARE ---
 * Sets up how we handle incoming file uploads (like profile pictures).
 */

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "PROFILE_PICS", // Where to save in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Only allow images
  },
});

const upload = multer({ storage });

module.exports = upload;