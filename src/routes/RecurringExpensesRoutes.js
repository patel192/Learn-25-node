const route = require("express").Router()
const RecurringExpensesController = require("../Controllers/RecurringExpensesController")
route.post("/recurring",RecurringExpensesController.AddRecurringExpense)
route.get("/recurring/:userId",RecurringExpensesController.RecurringExpenseByUserId)
module.exports = route