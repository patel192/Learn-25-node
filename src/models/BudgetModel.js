const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * --- BUDGET MODEL ---
 * Stores the spending limits set by users for specific categories.
 */

const BudgetSchema = new Schema(
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
      type: Number, // The maximum amount the user wants to spend
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("budget", BudgetSchema);