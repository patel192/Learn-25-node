const express = require("express");
const { getAdminReport } = require("../Controllers/ReportController");
const router = express.Router();

router.get("/adminreport", getAdminReport);

module.exports = router;
