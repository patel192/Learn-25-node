const routes = require("express").Router();
const Expensecontroller = require("../Controllers/ExepenseController");
const {requireAuth,requireRole} = require("../middleware/auth.middleware");

routes.post("/expense", requireAuth, Expensecontroller.AddExpense);
routes.get("/expenses", requireAuth,requireRole("Admin"),Expensecontroller.GetAllExpenses);
routes.get("/expense/:id", requireAuth, Expensecontroller.GetExpensebyID);
routes.put("/expense/:id", requireAuth, Expensecontroller.UpdateExpense);
routes.delete("/expense/:id", requireAuth, Expensecontroller.DeleteExpense);

routes.get("/expenses/me",requireAuth,Expensecontroller.GetExpensebyUserId,);
routes.get("/expenses/recent",requireAuth,Expensecontroller.GetRecentExpenses,);

module.exports = routes;
