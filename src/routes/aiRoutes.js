const express = require("express");
const {
  askAI,
  getExpenseInsights,
  generateBudgetPlan,
  detectSpendingRisk,
  getFinancialForecast,
  detectSavingOpportunities,
  getFinancialHealthScore,
  getAllInsights,
} = require("../Controllers/aiController");

const router = express.Router();

/**
 * --- AI POWERED FEATURES ---
 * Endpoints for intelligent financial analysis and chat.
 */

// General chat assistant
router.post("/ask", askAI);

// Data analysis and planning
router.get("/expense-insights/:userId", getExpenseInsights);
router.get("/budget-plan/:userId", generateBudgetPlan);
router.get("/spending-risk/:userId", detectSpendingRisk);
router.get("/financial-forecast/:userId", getFinancialForecast);
router.get("/saving-opportunities/:userId", detectSavingOpportunities);
router.get("/financial-health/:userId", getFinancialHealthScore);

// History and metadata
router.get("/insights/:userId", getAllInsights);

module.exports = router;

