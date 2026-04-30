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
const DeleteExpense = async (req, res) => {
  try {

    const expense = await ExpenseModel.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Ownership check
    if (expense.userID.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this expense"
      });
    }

    await ExpenseModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Expense deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const UpdateExpense = async (req, res) => {
  try {
    const expense = await ExpenseModel.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Ownership check
    if (expense.userID.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this expense"
      });
    }

    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Expense updated successfully",
      data: updatedExpense
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
const GetExpensebyUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, categoryID, minAmount, maxAmount } = req.query;

    let query = { userID: userId };

    // Date Filtering
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Category Filtering
    if (categoryID) {
      query.categoryID = categoryID;
    }

    // Amount Filtering
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }

    const expenses = await ExpenseModel.find(query)
      .populate("userID categoryID")
      .sort({ date: -1 });

    if (expenses.length === 0) {
      return res.status(200).json({
        message: "No Expenses Found matching filters",
        data: [],
      });
    }

    res.status(200).json({
      message: "Expenses Found Successfully",
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
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
    AddExpense,GetAllExpenses,DeleteExpense,UpdateExpense,GetExpensebyID,GetExpensebyUserId,GetRecentExpenses
}