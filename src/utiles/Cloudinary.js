const cloudinary = require("cloudinary");

// --- CLOUDINARY CONFIGURATION ---
// This connects us to our image storage cloud so we can upload profile pictures
cloudinary.config({
  cloud_name: "dfaou6haj",
  api_key: "245224967886476",
  api_secret: "iwGfwJ20603s_3DaZb5qycpN5PY",
});

module.exports = cloudinary;