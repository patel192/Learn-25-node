const BudgetModel = require("../models/BudgetModel")
const AddBudget = async (req,res) =>{
    try{ 
         const AddedBudget = await BudgetModel.create(req.body);
         res.status(201).json({
         message:"the budget is added successfully",
         data:AddedBudget
})
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
const GetAllbudget = async (req,res) =>{
    try{
        const Allbudget = await BudgetModel.find()
        res.status(200).json({
            message:"the budgets fetched successfully",
            data:Allbudget
        })

    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}
const GetBudgetbyID = async (req,res) =>{
    try{
      const BudgetbyId = await BudgetModel.findById(req.params.id)
      res.status(200).json({
        message:"the budget found successfully",
        data:BudgetbyId
      })
    }catch(err){
      res.status(404).json({
        message:err.message
      })
    }
}
const DeleteBudget = async (req,res) =>{
    try{
       const Deleteduser = await BudgetModel.findByIdAndDelete(req.params.id)
       res.status(200).json({
        message:"the budget removed successfully"
       })
    }catch(err){ 
        res.status(404).json({
            message:err.message
        })

    }
}
module.exports = {
    AddBudget,GetAllbudget,GetBudgetbyID,DeleteBudget
}