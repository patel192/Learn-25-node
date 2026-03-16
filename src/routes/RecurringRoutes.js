const express = require("express");
const router = express.Router();

const Recurring = require("../Controllers/RecurringController");

router.post("/recurring", Recurring.createRecurring);
router.get("/recurring/:userId", Recurring.getRecurringByUser);
router.delete("/recurring/:id", Recurring.deleteRecurring);
router.put("/recurring/:id",Recurring.updateRecurring);
module.exports = router;
