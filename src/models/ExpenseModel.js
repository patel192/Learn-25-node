const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ExpenseSchema = new Schema({
    amount:{
      type:Number
    },
    date:{
      type:Date
    },
    categoryID:{
      type:Schema.Types.ObjectId,
      ref:"Category"
    },
    description:{
      type:String
    }
}, {
    timestamps:true
})
module.exports = mongoose.model("expenses", ExpenseSchema)