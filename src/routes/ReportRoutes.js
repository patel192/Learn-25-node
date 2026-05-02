const express = require("express");
const router = express.Router();
const ReportController = require("../Controllers/ReportController");

// --- FINANCIAL REPORTS ---

// Generate a PDF summary for the user
router.get("/reports/:userId", ReportController.generateReport);

module.exports = router;