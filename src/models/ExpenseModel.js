const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ExpenseSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    categoryID:{
        type:Schema.Types.ObjectId,
        ref:"category"
    },
    amount:{
        type:Number
    },
    date:{
        type:Date
    },
    description:{
        type:String
    }
},{
    timestamps:true
})
module.exports = mongoose.model("expense",ExpenseSchema)