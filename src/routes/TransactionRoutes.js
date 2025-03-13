const routes = require("express").Router()
const TransactionController = require("../Controllers/TransactionController")
routes.post("/transaction",TransactionController.AddTransaction)
routes.get("/transactions",TransactionController.GetAlltransaction)
routes.get("/transaction/:id",TransactionController.GettransactionbyID)
routes.delete("/transaction/:id",TransactionController.DeleteTransaction)
module.exports = routes;