const routes = require("express").Router();
const IncomeController = require("../Controllers/IncomeController");
const {requireAuth,requireRole} = require("../middleware/auth.middleware");

routes.post("/income", requireAuth, IncomeController.AddIncome);
routes.get("/incomes", requireAuth,requireRole("Admin"),IncomeController.GetAllincome);
routes.delete("/income/:id", requireAuth, IncomeController.DeleteIncome);
routes.get("/income/:id", requireAuth, IncomeController.GetIncomebyID);
routes.get("/incomes/me",requireAuth,IncomeController.GetIncomebyUserID);

module.exports = routes;
