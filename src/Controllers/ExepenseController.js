const ExpenseService = require("../services/expense.service");
const asyncHandler = require("../middleware/asyncHandler");
const { sendSuccess } = require("../utiles/response");

const AddExpense = asyncHandler(async (req, res) => {
  const expense = await ExpenseService.addExpense(req.body, req.user.id);
  return sendSuccess(res, 201, "Expense Added successfully", expense);
});

const GetAllExpenses = asyncHandler(async (req, res) => {
    const expenses = await ExpenseService.getAllExpenses();
    return sendSuccess(res,200,"Expenses fetched successfully",expenses);
});

const DeleteExpense = asyncHandler(async (req, res) => {
  await ExpenseService.deleteExpense(req.params.id, req.user.id);
  return sendSuccess(res, 200, "Expense Deleted Successfully");
});

const UpdateExpense = asyncHandler(async (req, res) => {
  const updatedExpense = await ExpenseService.updateExpense(
    req.params.id,
    req.body,
    req.user.id,
  );
  return sendSuccess(res, 200, "Expense updated successfully", updatedExpense);
});

const GetExpensebyID = asyncHandler(async (req, res) => {
  const expense = await ExpenseService.getExpenseById(
    req.params.id,
    req.user.id,
  );
  return sendSuccess(res, 200, "Expense fetched successfuy", expense);
});

const GetExpensebyUserId = asyncHandler(async (req, res) => {
  const expenses = await ExpenseService.getExpenseByUserId(req.user.id,req.query);
  return sendSuccess(res,200,"Expense found successfully",expenses);
});

const GetRecentExpenses = asyncHandler(async (req, res) => {
   const recentExpenses = await ExpenseService.getRecentExpenses(req.user.id);
   return sendSuccess(
      res,
      200,
      "Recent expenses fetched successfully",
      recentExpenses
   );
});

module.exports = {
  AddExpense,
  GetAllExpenses,
  DeleteExpense,
  UpdateExpense,
  GetExpensebyID,
  GetExpensebyUserId,
  GetRecentExpenses,
};
