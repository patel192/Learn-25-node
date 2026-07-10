const routes = require("express").Router();
const Billcontroller = require("../Controllers/BillController");
const {requireAuth,requireRole} = require("../middleware/auth.middleware");

routes.post("/bill", requireAuth, Billcontroller.AddBill);
routes.get("/bills", requireAuth,requireRole("Admin"), Billcontroller.GetAllBills);
routes.delete("/bill/:id", requireAuth, Billcontroller.DeleteBill);
routes.get("/bill/:id", requireAuth, Billcontroller.GetBillbyID);
routes.get("/bills/me",requireAuth,Billcontroller.GetBillbyUserID);

module.exports = routes;
