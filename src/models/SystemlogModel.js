const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * --- SYSTEM LOG MODEL ---
 * Tracks events and actions within the application for auditing.
 */

const SystemLogSchema = new Schema(
  {
    user: {
      type: String, // The user involved in the action
      required: true,
    },
    action: {
      type: String, // e.g., "LOGIN", "CREATE_EXPENSE"
      required: true,
    },
    description: {
      type: String, // Extra details about what happened
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SystemLog", SystemLogSchema);

