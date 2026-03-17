const express= require("express");
const router = express.Router();

const ReportController = require("../Controllers/ReportController");
router.get("/reports/:userId",ReportController.generateReport);

module.exports = router;