const routes = require("express").Router();
const TransactionController = require("../Controllers/TransactionController");
const authMiddleware = require("../middleware/authMiddleware");

// --- GENERAL TRANSACTIONS ---

// Record any kind of money movement
routes.post(
  "/transaction",
  authMiddleware,
  TransactionController.AddTransaction,
);

// Get a list of every transaction on the platform
routes.get(
  "/transactions",
  authMiddleware,
  TransactionController.GetAlltransaction,
);

// Find details for one specific transaction
routes.get(
  "/transaction/:id",
  authMiddleware,
  TransactionController.GettransactionbyID,
);

// Remove a transaction from history
routes.delete(
  "/transaction/:id",
  authMiddleware,
  TransactionController.DeleteTransaction,
);

// Fetch the complete transaction history for a single user
routes.get(
  "/transactionsByUserId/:userId",
  authMiddleware,
  TransactionController.TransactionByUserId,
);

module.exports = routes;