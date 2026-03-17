const express = require("express");
const router = express.Router();

const Recurring = require("../Controllers/RecurringController");

router.post("/recurring", Recurring.createRecurring);
router.get("/recurring/:userId", Recurring.getRecurringByUser);
router.delete("/recurring/:id", Recurring.deleteRecurring);
router.put("/recurring/:id", Recurring.updateRecurring);
router.get("/recurring/upcoming/:userId", Recurring.getUpcomingRecurring);
router.patch("/recurring/toggle/:id",Recurring.toggleRecurringStatus);
module.exports = router;

