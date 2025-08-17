const ExpenseModel = require("../models/ExpenseModel")
const AddExpense = async (req,res) =>{
    try{
      const AddedExpense = await ExpenseModel.create(req.body)
      res.status(201).json({
        message:"the expense added successfully",
        data:AddedExpense
      })
    }catch(err){
       res.status(500).json({
        message:err.message
       })
    }
}
const GetAllExpenses = async (req,res) =>{
    try{
       const AllExpenses = await ExpenseModel.find().populate("categoryID")
       res.status(200).json({
        message:"The expenses fetched successfully",
        data:AllExpenses
       })
    }catch(err){
       res.status(404).json({
        message:err.message
       })
    }
}
const DeleteExpense = async (req,res) => {
    try{
        const DeltedExpense = await ExpenseModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"the expense is deleted successfully"
        })
    }catch(err){
       res.status(404).json({
        message:err.message
       })
    }
}
const GetExpensebyID = async (req,res) => {
    try{
        const ExpensebyID = await ExpenseModel.findById(req.params.id)
        res.status(200).json({
            message:"The expense fetched successfully",
            data:ExpensebyID
        })
    }catch(error){
         res.status(404).json({
            message:error.message
         })
    }
}
const GetExpensebyUserId = async (req,res) => {
    try{
      const ExpensebyUserID = await ExpenseModel.find({userID:req.params.userId}).populate("userID");
      if(ExpensebyUserID.length === 0){
        res.status(404).json({
            message:"No Expenses Found"
        })
      }else{
        res.status(200).json({
            message:"Expense Found Successfully",
            data:ExpensebyUserID
        })
      }
    }catch(error){
      res.status(500).json({
        message:error.message
      })
    }
}
const GetRecentExpenses = async (req,res) => {
  try{
   const recentExpenses = await ExpenseModel.find({ userID: req.params.userId })
      .sort({ date: -1 }) // newest first
      .limit(5); // limit to 5 results

    res.status(200).json({
      success: true,
      data: recentExpenses
    }); 
  }catch(err){
  res.status(500).json({
    message:err.message
  })
  }
}
module.exports = {
    AddExpense,GetAllExpenses,DeleteExpense,GetExpensebyID,GetExpensebyUserId,GetRecentExpenses
}