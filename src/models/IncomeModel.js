const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * --- INCOME MODEL ---
 * Represents money earned by the user (Salary, Bonus, etc.).
 */

const IncomeSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String, // e.g., "Freelance Project", "Company A"
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("income", IncomeSchema);