const routes = require("express").Router();
const BudgetController = require("../Controllers/BudgetController");
const {requireAuth,requireRole} = require("../middleware/auth.middleware");

routes.post("/budget", requireAuth, BudgetController.AddBudget);
routes.get("/budgets", requireAuth,requireRole("Admin"), BudgetController.GetAllbudget);
routes.get("/budget/:id", requireAuth, BudgetController.GetBudgetbyID);
routes.delete("/budget/:id", requireAuth, BudgetController.DeleteBudget);
routes.get("/budgets/me",requireAuth,BudgetController.GetBudgetbyUserID,);

module.exports = routes;
