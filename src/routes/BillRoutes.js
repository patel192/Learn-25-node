const routes = require("express").Router()
const Billcontroller = require("../Controllers/BillController")
routes.post("/bill",Billcontroller.AddBill)
routes.get("/bills",Billcontroller.GetAllBills)
routes.delete("/bill/:id",Billcontroller.DeleteBill)
routes.get("/bill/:id",Billcontroller.GetBillbyID)
routes.get("/billByuserId/:userId",Billcontroller.GetBillbyUserID)
module.exports = routes;