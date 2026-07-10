const routes = require("express").Router();
const TransactionController = require("../Controllers/TransactionController");
const {requireAuth,requireRole} = require("../middleware/auth.middleware");

routes.post("/transaction",requireAuth,TransactionController.AddTransaction);
routes.get("/transactions",requireAuth,requireRole("Admin"),TransactionController.GetAlltransaction);
routes.get("/transaction/:id",requireAuth,TransactionController.GettransactionbyID);
routes.delete("/transaction/:id",requireAuth,TransactionController.DeleteTransaction);
routes.get("/transactions/me",requireAuth,TransactionController.TransactionByUserId);

module.exports = routes;
