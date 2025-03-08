const routes = require("express").Router()
const Budgetcontroller = require("../Controllers/BudgetController")
routes.post("/budget",Budgetcontroller.addBudget)
routes.get("/budgetbyid/:id",Budgetcontroller.getBudget)
module.exports = routes;