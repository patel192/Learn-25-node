const express = require("express");
const {
  askAI,
  getExpenseInsights,
  generateBudgetPlan,
  detectSpendingRisk,
  getFinancialForecast
} = require("../Controllers/aiController");

const router = express.Router();

router.post("/ask", askAI);
router.get("/expense-insights/:userId", getExpenseInsights);
router.get("/budget-plan/:userId", generateBudgetPlan);
router.get("/spending-risk/:userId",detectSpendingRisk);
router.get("/financial-forecast/:userId",getFinancialForecast);
module.exports = router;
