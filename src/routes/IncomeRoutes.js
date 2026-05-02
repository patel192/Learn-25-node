const routes = require("express").Router();
const IncomeController = require("../Controllers/IncomeController");
const authMiddleware = require("../middleware/authMiddleware");

// --- INCOME ENDPOINTS ---

// Record a new income entry
routes.post("/income", authMiddleware, IncomeController.AddIncome);

// Get a list of all income records
routes.get("/incomes", authMiddleware, IncomeController.GetAllincome);

// Remove a specific income entry
routes.delete("/income/:id", authMiddleware, IncomeController.DeleteIncome);

// Look up details for one income record
routes.get("/income/:id", authMiddleware, IncomeController.GetIncomebyID);

// Fetch all income records for a specific user
routes.get(
  "/incomesbyUserID/:userId",
  authMiddleware,
  IncomeController.GetIncomebyUserID,
);

module.exports = routes;