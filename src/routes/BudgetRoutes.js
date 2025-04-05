const routes = require("express").Router()
const BudgetController = require("../Controllers/BudgetController")
routes.post("/budget",BudgetController.AddBudget)
routes.get("/budgets",BudgetController.GetAllbudget)
routes.get("/budget/:id",BudgetController.GetBudgetbyID)
routes.delete("/budget/:id",BudgetController.DeleteBudget)
routes.get("/budgetsbyUserID/:id",BudgetController.GetBudgetbyUserID)
module.exports = routes;