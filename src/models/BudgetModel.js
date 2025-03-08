const mongoose = require("mongoose")
const { applyTimestamps } = require("./CategoriesModel")
const Schema = mongoose.Schema
const Budgetschema = new Schema({
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
    start_date:{
        type:Date
    },
    end_date:{
        type:Date
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Budget",Budgetschema)