const express = require("express");
const router = express.Router();
const Recurring = require("../Controllers/RecurringController");

// --- RECURRING TRANSACTIONS ---

// Set up a new automated/recurring transaction
router.post("/recurring", Recurring.createRecurring);

// Manage existing recurring transactions
router.get("/recurring/:userId", Recurring.getRecurringByUser);
router.put("/recurring/:id", Recurring.updateRecurring);
router.delete("/recurring/:id", Recurring.deleteRecurring);

// Special features: upcoming list and on/off switch
router.get("/recurring/upcoming/:userId", Recurring.getUpcomingRecurring);
router.patch("/recurring/toggle/:id", Recurring.toggleRecurringStatus);

module.exports = router;


