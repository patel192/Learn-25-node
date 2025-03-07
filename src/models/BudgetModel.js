const mongooose = require("mongoose")
const Schema = mongoose.Schema
const Budgetschema = new Schema({
    amount:{
        type:Number
    },
    start_date:{
        type:date
    },
    end_date:{
        type:date
    }
})
module.exports = mongoose.model("Budget",Budgetschema)