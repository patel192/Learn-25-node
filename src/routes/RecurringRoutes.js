const express = require("express");
const router = express.Router();
const Recurring = require("../Controllers/RecurringController");
const {requireAuth} = require("../middleware/auth.middleware");

router.post("/recurring",requireAuth,Recurring.createRecurring);
router.get("/recurring/me",requireAuth,Recurring.getRecurringByUser);
router.put("/recurring/:id", requireAuth, Recurring.updateRecurring);
router.delete("/recurring/:id", requireAuth, Recurring.deleteRecurring);
router.get("/recurring/upcoming", requireAuth, Recurring.getUpcomingRecurring);
router.patch("/recurring/toggle/:id", requireAuth, Recurring.toggleRecurringStatus);

module.exports = router;


