const routes = require("express").Router()
const Billcontroller = require("../Controllers/BillController")
const authMiddleware = require("../middleware/authMiddleware");
routes.post("/bill",authMiddleware,Billcontroller.AddBill)
routes.get("/bills",authMiddleware,Billcontroller.GetAllBills)
routes.delete("/bill/:id",authMiddleware,Billcontroller.DeleteBill)
routes.get("/bill/:id",authMiddleware,Billcontroller.GetBillbyID)
routes.get("/billByuserId/:userId",authMiddleware,Billcontroller.GetBillbyUserID)
module.exports = routes;