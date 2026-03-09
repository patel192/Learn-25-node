const express = require("express");
const { askAI, getExpenseInsights } = require("../Controllers/aiController");

const router = express.Router();

router.post("/ask", askAI);
router.get("/expense-insights/:userId", getExpenseInsights);

module.exports = router;
