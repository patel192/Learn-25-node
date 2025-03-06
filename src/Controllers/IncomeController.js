const IncomeModel = require("../models/IncomeModel")
const addIncome = async (req,res) =>{
    try{

        const addedIncome = await IncomeController.create(req.body)
        res.status(201).json({
            message:"the income added successfully",
            data:addedIncome
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
module.exports = {
    addIncome
}