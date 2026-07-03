const BudgetModel = require("../models/BudgetModel");

const AddBudget = async (req, res) => {
  const budgetData = {...req.body,userID:req.user.id};
  try {
    const AddedBudget = await BudgetModel.create(budgetData);
    res.status(201).json({
      message: "the budget is added successfully",
      data: AddedBudget,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const GetAllbudget = async (req, res) => {
  try {
    const Allbudget = await BudgetModel.find().populate("categoryID");
    res.status(200).json({
      message: "the budgets fetched successfully",
      data: Allbudget,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const GetBudgetbyID = async (req, res) => {
  try {
    const BudgetbyId = await BudgetModel.findById(req.params.id);
    if(!BudgetbyId){
      return res.status(404).json({
        message:"Budget not found"
      });
    }
    if(BudgetbyId.userID.toString() !== req.user.id){
      return res.status(403).json({
        message:"Forbidden"
      });
    }
    res.status(200).json({
      message: "the budget found successfully",
      data: BudgetbyId,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const DeleteBudget = async (req, res) => {
  try {
    const budget = await BudgetModel.findById(req.params.id);
    if(!budget){
      return res.status(404).json({
        message:"Budget not found"
      });
    }
    if(budget.userID.toString() !== req.user.id){
      return res.status(403).json({
        message:"Forbidden"
      });
    }
    await BudgetModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "the budget removed successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const GetBudgetbyUserID = async (req, res) => {
  try {
    const userId = req.user.id;
    const BudgetbyUserID = await BudgetModel.find({
      userID: userId,
    }).populate("userID categoryID");

    if (BudgetbyUserID.length === 0) {
      res.status(404).json({
        message: "No Budget Found",
      });
    } else {
      res.status(200).json({
        message: "Budget Found Successfully",
        data: BudgetbyUserID,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  AddBudget,
  GetAllbudget,
  GetBudgetbyID,
  DeleteBudget,
  GetBudgetbyUserID,
};

