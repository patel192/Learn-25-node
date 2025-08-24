const routes = require("express").Router()
const IncomeController = require("../Controllers/IncomeController")
const authMiddleware = require("../middleware/authMiddleware");
routes.post("/income",authMiddleware,IncomeController.AddIncome)
routes.get("/incomes",authMiddleware,IncomeController.GetAllincome)
routes.delete("/income/:id",authMiddleware,IncomeController.DeleteIncome)
routes.get("/income/:id",authMiddleware,IncomeController.GetIncomebyID)
routes.get("/incomesbyUserID/:userId",authMiddleware,IncomeController.GetIncomebyUserID)
module.exports = routes;