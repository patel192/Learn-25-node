const routes = require("express").Router()
const Expensecontroller = require("../Controllers/ExepenseController")
routes.post("/expense",Expensecontroller.AddExpense)
routes.get("/expenses",Expensecontroller.GetAllExpenses)
routes.delete("/expense/:id",Expensecontroller.DeleteExpense)
routes.get("/expense/:id",Expensecontroller.GetExpensebyID)
routes.get("/expensesbyUserID/:id",Expensecontroller.GetExpensebyUserId)
routes.get("/recent-expense/:userId",Expensecontroller.GetRecentExpenses)
module.exports = routes;