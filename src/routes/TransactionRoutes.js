const routes = require("express").Router()
const TransactionController = require("../Controllers/TransactionController")
const authMiddleware = require("../middleware/authMiddleware");
routes.post("/transaction",authMiddleware,TransactionController.AddTransaction)
routes.get("/transactions",authMiddleware,TransactionController.GetAlltransaction)
routes.get("/transaction/:id",authMiddleware,TransactionController.GettransactionbyID)
routes.delete("/transaction/:id",authMiddleware,TransactionController.DeleteTransaction)
routes.get("/transactionsByUserId/:userId",authMiddleware,TransactionController.TransactionByUserId)
module.exports = routes;