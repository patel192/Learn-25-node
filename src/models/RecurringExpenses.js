const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RecurringExpensesSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please Provide the Recurring Expense Name"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please Provide an Amount"],
      min: [0, "Amount Can Not Be Negative"],
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Yearly"],
      required: true,
      default: "Monthly",
    },
    startDate: {
      type: Date,
      required: [true, "The Starting Date is Required"],
    },
    category: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Paused"],
      default: "Active",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("RecurringExpenses",RecurringExpensesSchema)