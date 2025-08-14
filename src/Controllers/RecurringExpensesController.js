const RecurringExpensesModel = require("../models/RecurringExpenses");
const AddRecurringExpense = async (req, res) => {
  try {
    const AddedRecurringExpense = await RecurringExpensesModel.create(req.body);
    res.status(201).json({
      message: "Expense Added Successfully",
      data: AddedRecurringExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const RecurringExpenseByUserId = async (req,res) => {
  try {
    const RecurringExpenses = await RecurringExpensesModel.find({
      userId: req.params.userId,
    });
    res.status(200).json({
      message: "Expenses Found Successfully",
      data: RecurringExpenses,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
module.exports = {
    AddRecurringExpense,
    RecurringExpenseByUserId
}