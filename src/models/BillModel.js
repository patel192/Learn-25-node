const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const BillSchema = new Schema({
   userID: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
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
  }
},{
    timestamps:true
})
module.exports = mongoose.model("bill",BillSchema)