const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name:{
        type:String
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
      }
},{
    timestamps:true
})
module.exports = mongoose.model("category",categorySchema)