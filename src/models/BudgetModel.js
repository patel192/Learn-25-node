const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const BudgetSchema = new Schema({
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
module.exports = mongoose.model("budget",BudgetSchema)