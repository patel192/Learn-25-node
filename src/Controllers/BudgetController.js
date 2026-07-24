const asyncHandler = require("../middleware/asyncHandler");
const BudgetService = require("../services/budget.service");
const {sendSuccess} = require("../utiles/response");

const AddBudget = asyncHandler(async (req, res) => {
  const budget = await BudgetService.addBudget(req.body, req.user.id);
  return sendSuccess(
    res,
    201,
    "Budget added successfully",
    budget
  );
});

const GetAllbudget = asyncHandler(async (req, res) => {
  const budgets = await BudgetService.getAllBudget();

  return sendSuccess(
    res,
    200,
    "Budgets fetched successfully",
    budgets
  );
});

const GetBudgetbyID = asyncHandler(async (req, res) => {
  const budget = await BudgetService.getBudgetById(
    req.params.id,
    req.user.id
  );

  return sendSuccess(
    res,
    200,
    "Budget found successfully",
    budget
  );
});

const DeleteBudget = asyncHandler(async (req, res) => {
  await BudgetService.deleteBudget(
    req.params.id,
    req.user.id
  );

  return sendSuccess(
    res,
    200,
    "Budget deleted successfully"
  );
});

const GetBudgetbyUserID = asyncHandler(async (req, res) => {
  const budgets = await BudgetService.getBudgetByUserId(
    req.user.id
  );

  return sendSuccess(
    res,
    200,
    "Budget found successfully",
    budgets
  );
});

module.exports = {
  AddBudget,
  GetAllbudget,
  GetBudgetbyID,
  DeleteBudget,
  GetBudgetbyUserID,
};

