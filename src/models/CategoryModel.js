const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * --- CATEGORY MODEL ---
 * Defines the classification for transactions (e.g., Food, Travel).
 */

const categorySchema = new Schema(
  {
    name: {
      type: String, // Name of the category
    },
    type: {
      type: String, // Whether it's for money coming in or going out
      enum: ["income", "expense"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("category", categorySchema);