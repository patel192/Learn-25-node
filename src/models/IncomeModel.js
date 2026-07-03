const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

IncomeSchema.index({
  userID:1,
  date:-1
});
module.exports = mongoose.model("income", IncomeSchema);
