const routes = require("express").Router()
const ExpenseController = require("../Controllers/ExpenseController")
const ExpenseModel = require("../models/ExpenseModel")
routes.post("/expense",ExpenseController.addExpense)
routes.get("/expenses",ExpenseController.getExpense)
routes.delete("/expense/:id",ExpenseController.deleteExpense)
module.exports = routes;