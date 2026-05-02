const mongoose = require("mongoose");

/**
 * --- RECURRING TRANSACTION MODEL ---
 * Defines the schedule for automated transactions (Subscriptions, etc.)
 */

const recurringSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    nextDate: {
      type: Date, // When the next instance should be created
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Can be toggled off by the user
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("recurring", recurringSchema);

