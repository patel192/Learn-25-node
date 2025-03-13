const mongoose = require("mongoose")
const Schema = mongoose.Schema
const TransactionSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    type:{
        type:String
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
module.exports = mongoose.model("trasaction",TransactionSchema)