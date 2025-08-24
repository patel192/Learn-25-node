const routes = require("express").Router()
const BudgetController = require("../Controllers/BudgetController")
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin")
routes.post("/budget",authMiddleware,BudgetController.AddBudget)
routes.get("/budgets",authMiddleware,BudgetController.GetAllbudget)
routes.get("/budget/:id",authMiddleware,BudgetController.GetBudgetbyID)
routes.delete("/budget/:id",authMiddleware,BudgetController.DeleteBudget)
routes.get("/budgetsbyUserID/:userId",authMiddleware,BudgetController.GetBudgetbyUserID)
module.exports = routes;