const ExpenseModel = require("../models/ExpenseModel");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const addExpense = async (data, userId) => {
  const expenseData = { ...data, userID: userId };
  const expense = await ExpenseModel.create(expenseData);
  return expense;
};

const deleteExpense = async (expenseId, userId) => {
  const expense = await ExpenseModel.findById(expenseId);
  if (!expense) {
    throw new NotFoundError("Expense not found");
  }

  if (expense.userID.toString() !== userId) {
    throw new ForbiddenError("You are not authorized to delete this expense");
  }

  await ExpenseModel.findByIdAndDelete(expenseId);
};

const updateExpense = async (id, data, userId) => {
  const expense = await ExpenseModel.findById(id);
  if (!expense) {
    throw new NotFoundError("Expense Not found");
  }

  if (expense.userID.toString() !== userId) {
    throw new ForbiddenError("You are not Authorized to Update this expense");
  }

  const updatedExpense = await ExpenseModel.findByIdAndUpdate(
    id,
    data,
    { new: true }
);

return updatedExpense;
};

const getExpenseById = async (id, userId) => {
  const expense = await ExpenseModel.findById(id).populate("categoryID");
  if (!expense) {
    throw new NotFoundError("Expense not found");
  }

  if (expense.userID.toString() !== userId) {
    throw new ForbiddenError(
      "Forbidden: You are not authorized to access this expense",
    );
  }

  return expense;
};

const getExpenseByUserId = async (userId, filter) => {
  const { startDate, endDate, categoryID, minAmount, maxAmount } = filter;

  let query = { userID: userId };

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }
  if (categoryID) {
    query.categoryID = categoryID;
  }

  if (minAmount || maxAmount) {
    query.amount = {};
    if (minAmount) query.amount.$gte = Number(minAmount);
    if (maxAmount) query.amount.$lte = Number(maxAmount);
  }
  const expenses = await ExpenseModel.find(query)
    .populate("userID categoryID")
    .sort({ date: -1 });

  return expenses;
};

const getAllExpenses = async() => {
  return await ExpenseModel.find().populate("categoryID");
}

const getRecentExpenses = async(userId) => {
 return await ExpenseModel.find({ userID: userId })
      .sort({ date: -1 }) // newest first
      .limit(5); // limit to 5 results
}
module.exports = {
  addExpense,
  deleteExpense,
  updateExpense,
  getExpenseById,
  getExpenseByUserId,
  getAllExpenses,
  getRecentExpenses
};
