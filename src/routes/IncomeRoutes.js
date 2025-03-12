const routes = require("express").Router()
const IncomeController = require("../Controllers/IncomeController")
routes.post("/income",IncomeController.AddIncome)
routes.get("/incomes",IncomeController.GetAllincome)
routes.delete("/income/:id",IncomeController.DeleteIncome)
routes.get("/income/:id",IncomeController.GetIncomebyID)
module.exports = routes;