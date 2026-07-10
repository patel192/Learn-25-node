const express = require("express");
const router = express.Router();
const ReportController = require("../Controllers/ReportController");
const {requireAuth} = require("../middleware/auth.middleware");

router.get("/reports/me",requireAuth, ReportController.generateReport);

module.exports = router;
