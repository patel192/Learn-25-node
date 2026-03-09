const express = require("express");
const {
  askAI,
  getExpenseInsights,
  generateBudgetPlan,
  detectSpendingRisk
} = require("../Controllers/aiController");

const router = express.Router();

router.post("/ask", askAI);
router.get("/expense-insights/:userId", getExpenseInsights);
router.get("/budget-plan/:userId", generateBudgetPlan);
router.get("/spending-risk/:userId",detectSpendingRisk);
module.exports = router;
