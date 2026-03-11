const mongoose = require("mongoose");

const AllInsightSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model("AllInsight",AllInsightSchema);