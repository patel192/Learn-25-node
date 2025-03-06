const routes = require("express").Router()
const transactionModel = require("../models/transactionModel")
const TransactionController = require("../Controllers/TransactionController")
routes.post("/transaction",TransactionController.addTransaction)
routes.get("/transactions",TransactionController.getTransactions)
routes.get("/transaction/:id",TransactionController.getTransactionById)
module.exports = routes;