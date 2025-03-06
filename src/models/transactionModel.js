const mongoose = require("mongoose")
const Schema = mongoose.Schema
const transectionSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    Type:{
        type:String,
        unique:true
    },
    Amount:{
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
module.exports = mongoose.model("transaction",transectionSchema)