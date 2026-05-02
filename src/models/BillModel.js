const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * --- BILL MODEL ---
 * Represets a utility bill or any recurring payment due.
 */

const BillSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String, // e.g., "Electricity Bill"
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("bill", BillSchema);