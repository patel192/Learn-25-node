const route = require("express").Router();
const RecurringExpensesController = require("../Controllers/RecurringExpensesController");
const authMiddleware = require("../middleware/authMiddleware");
route.post("/recurring",authMiddleware, RecurringExpensesController.AddRecurringExpense);
route.get(
  "/recurring/:userId",authMiddleware,
  RecurringExpensesController.RecurringExpenseByUserId
);
module.exports = route;
