const routes = require("express").Router();
const Expensecontroller = require("../Controllers/ExepenseController");
const authMiddleware = require("../middleware/authMiddleware");

// --- EXPENSE ENDPOINTS ---

// Standard CRUD operations
routes.post("/expense", authMiddleware, Expensecontroller.AddExpense);
routes.get("/expenses", authMiddleware, Expensecontroller.GetAllExpenses);
routes.get("/expense/:id", authMiddleware, Expensecontroller.GetExpensebyID);
routes.put("/expense/:id", authMiddleware, Expensecontroller.UpdateExpense);
routes.delete("/expense/:id", authMiddleware, Expensecontroller.DeleteExpense);

// Specialized filters and lookups
routes.get(
  "/expensesbyUserID/:userId",
  authMiddleware,
  Expensecontroller.GetExpensebyUserId,
);
routes.get(
  "/recent-expense/:userId",
  authMiddleware,
  Expensecontroller.GetRecentExpenses,
);

module.exports = routes;