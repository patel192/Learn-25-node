const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * --- EXPENSE MODEL ---
 * Tracks individual instances of money being spent.
 */

const ExpenseSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String, // Optional notes about the purchase
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("expense", ExpenseSchema);