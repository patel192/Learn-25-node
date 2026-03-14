const mongoose = require("mongoose");
const recurringSchema = new mongoose.Schema({
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
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
module.exports = mongoose.model("recurring", recurringSchema);
