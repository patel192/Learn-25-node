const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    status:{
        type:Boolean
    },
    password:{
        type:String,
    },
    email:{
        type:String,
    },
    gender:{
        type:String,

    }

})

module.exports = mongoose.model("users",userSchema)