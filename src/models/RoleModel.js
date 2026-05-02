const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * --- ROLE MODEL ---
 * Defines the permissions level for users (Admin, User, etc.).
 */

const RoleSchema = new Schema(
  {
    name: {
      type: String, // e.g., "Admin", "User"
      unique: true,
      required: true,
    },
    description: {
      type: String, // What this role is allowed to do
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("role", RoleSchema);