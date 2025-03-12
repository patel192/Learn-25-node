const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    name:{
        type:String
    }
})
module.exports = mongoose.model("category",categorySchema)