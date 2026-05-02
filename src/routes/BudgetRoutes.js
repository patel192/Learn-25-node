const routes = require("express").Router();
const BudgetController = require("../Controllers/BudgetController");
const authMiddleware = require("../middleware/authMiddleware");

// --- BUDGETING ENDPOINTS ---

// Set a new spending goal
routes.post("/budget", authMiddleware, BudgetController.AddBudget);

// List all budgets
routes.get("/budgets", authMiddleware, BudgetController.GetAllbudget);

// Get details for one specific budget
routes.get("/budget/:id", authMiddleware, BudgetController.GetBudgetbyID);

// Delete a budget plan
routes.delete("/budget/:id", authMiddleware, BudgetController.DeleteBudget);

// Get all budget goals assigned to a user
routes.get(
  "/budgetsbyUserID/:userId",
  authMiddleware,
  BudgetController.GetBudgetbyUserID,
);

module.exports = routes;