const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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


TransactionSchema.index({
  userID:1,
  date:-1
});
TransactionSchema.index({
  userID:1,
  type:1
});
module.exports = mongoose.model("transaction", TransactionSchema);
