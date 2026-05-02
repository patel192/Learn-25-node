const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * --- TRANSACTION MODEL ---
 * A generic record for any kind of financial movement.
 */

const TransactionSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    type: {
      type: String, // e.g., "Income", "Expense"
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
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("transaction", TransactionSchema);