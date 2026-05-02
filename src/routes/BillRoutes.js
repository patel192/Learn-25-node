const routes = require("express").Router();
const Billcontroller = require("../Controllers/BillController");
const authMiddleware = require("../middleware/authMiddleware");

// --- BILLING ENDPOINTS ---

// Record a new bill
routes.post("/bill", authMiddleware, Billcontroller.AddBill);

// Get a list of all bills
routes.get("/bills", authMiddleware, Billcontroller.GetAllBills);

// Remove a specific bill
routes.delete("/bill/:id", authMiddleware, Billcontroller.DeleteBill);

// Look up details for one bill
routes.get("/bill/:id", authMiddleware, Billcontroller.GetBillbyID);

// Fetch every bill that belongs to a specific user
routes.get(
  "/billByuserId/:userId",
  authMiddleware,
  Billcontroller.GetBillbyUserID,
);

module.exports = routes;