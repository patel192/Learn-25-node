const Budgetcontroller = require("../models/BudgetModel")
const addBudget = async (req,res) =>{
    try{
       const addedBudget = await Budgetcontroller.create(req.body)
       res.status(201).json({
        message:"the budget added successfully",
        data:addedBudget
       })
    }catch(err){
      res.status(500).json({
        message:err.message
      })
    }
}
const getBudget = async (req,res) => {
    try{
        const budgetFindbyID = await Budgetcontroller.findById(req.params.id).populate("userID")
        
        res.status(200).json({
            message:"Budget found succefully",
            data:budgetFindbyID
        })

    }catch(err){
       res.status(404).json({
        message:err.message
       })
    }

}
module.exports = {
    addBudget,
    getBudget
}