const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * --- USER MODEL ---
 * The core entity representing a person using the platform.
 */

const UserSchema = new Schema(
  {
    // --- CORE IDENTITY ---
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String, // Hashed
      required: true,
    },
    age: {
      type: Number,
    },

    // --- ACCESS CONTROL ---
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    is_active: {
      type: Boolean,
      default: true,
    },

    // --- PROFILE DETAILS ---
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("users", UserSchema);

