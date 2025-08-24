const routes = require("express").Router()
const Expensecontroller = require("../Controllers/ExepenseController")
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin")
routes.post("/expense",authMiddleware,Expensecontroller.AddExpense)
routes.get("/expenses",authMiddleware,Expensecontroller.GetAllExpenses)
routes.delete("/expense/:id",authMiddleware,Expensecontroller.DeleteExpense)
routes.get("/expense/:id",authMiddleware,Expensecontroller.GetExpensebyID)
routes.get("/expensesbyUserID/:userId",authMiddleware,Expensecontroller.GetExpensebyUserId)
routes.get("/recent-expense/:userId",authMiddleware,Expensecontroller.GetRecentExpenses)
module.exports = routes;