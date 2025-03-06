const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const IncomeSchema = new Schema({
    userID:{
       type:Schema.Types.ObjectId,
       ref:"users"
    },
    
    amount:{
        type:Number
    },
    source:{
        type:String
    },
    date:{
        type:Date
    }
})
module.exports = mongoose.model("income",IncomeSchema)