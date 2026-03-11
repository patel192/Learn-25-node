const { generateAIResponse } = require("../services/aiService");
const ExpenseModel = require("../models/ExpenseModel");
const IncomeModel = require("../models/IncomeModel");
const AllInsightModel = require("../models/AllInsightModel");

const saveInsight = async (userId, type, content) => {
  try {
    await AllInsightModel.create({
      userID: userId,
      type,
      content,
    });
  } catch (error) {
    console.error("Insight Save Error:", error.message);
  }
};

// ===============================
// AI Chat
// ===============================

const askAI = async (req, res) => {
  try {
    const { message, userId } = req.body;

    const aiReply = await generateAIResponse(message);

    if (userId) {
      await saveInsight(userId, "ai-chat", aiReply);
    }

    res.json({
      success: true,
      reply: aiReply,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===============================
// Expense Insights
// ===============================

const getExpenseInsights = async (req, res) => {
  try {
    const { userId } = req.params;

    const expenses = await ExpenseModel.find({ userID: userId }).populate(
      "categoryID"
    );

    if (!expenses.length) {
      return res.json({
        success: true,
        insights: [],
      });
    }

    const summary = expenses.reduce((acc, item) => {
      const category = item.categoryID?.name || "Other";
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    const prompt = `
You are a financial advisor.

Analyze the following expense summary and return ONLY JSON in this format:

{
  "topCategory": "",
  "totalExpenses": "",
  "insights": [],
  "recommendations": []
}

Expense Summary:
${JSON.stringify(summary, null, 2)}
`;

    const aiReply = await generateAIResponse(prompt);

    let parsed;

    try {
      parsed = JSON.parse(aiReply);
    } catch {
      parsed = {
        insights: [aiReply],
        recommendations: [],
      };
    }

    await saveInsight(userId, "expense-insights", JSON.stringify(parsed));

    res.json({
      success: true,
      insights: parsed,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===============================
// Budget Planner
// ===============================

const generateBudgetPlan = async (req, res) => {
  try {
    const { userId } = req.params;

    const incomes = await IncomeModel.find({ userID: userId });
    const expenses = await ExpenseModel.find({ userID: userId }).populate(
      "categoryID"
    );

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

    const summary = expenses.reduce((acc, item) => {
      const category = item.categoryID?.name || "Other";
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    const totalExpenses = Object.values(summary).reduce(
      (sum, v) => sum + v,
      0
    );

    const prompt = `
You are a financial advisor AI.

Return ONLY valid JSON.

{
 "snapshot": {
   "income": number,
   "expenses": number,
   "surplus": number
 },
 "budgetPlan": [
   { "category": "string", "recommended": number }
 ],
 "recommendations": ["string"]
}

User Monthly Income: ${totalIncome}

User Expenses:
${JSON.stringify(summary, null, 2)}
`;

    const aiReply = await generateAIResponse(prompt);

    let cleaned = aiReply.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        snapshot: {
          income: totalIncome,
          expenses: totalExpenses,
          surplus: totalIncome - totalExpenses,
        },
        budgetPlan: [],
        recommendations: [cleaned],
      };
    }

    await saveInsight(userId, "budget-plan", JSON.stringify(parsed));

    res.json({
      success: true,
      budgetPlan: parsed,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===============================
// Spending Risk Detection
// ===============================

const detectSpendingRisk = async (req, res) => {
  try {
    const { userId } = req.params;

    const incomes = await IncomeModel.find({ userID: userId });

    const expenses = await ExpenseModel.find({ userID: userId }).populate(
      "categoryID"
    );

    if (!expenses.length) {
      return res.json({
        success: true,
        risk: {
          riskLevel: "Low",
          message: "No spending data available.",
        },
      });
    }

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

    const summary = expenses.reduce((acc, item) => {
      const category = item.categoryID?.name || "Other";
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    const prompt = `
Analyze this spending data and detect overspending risk.

Income: ${totalIncome}

Expenses:
${JSON.stringify(summary, null, 2)}

Return JSON:

{
 "riskLevel": "",
 "category": "",
 "reason": "",
 "suggestion": ""
}
`;

    const aiReply = await generateAIResponse(prompt);

    const cleaned = aiReply.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        riskLevel: "Unknown",
        category: "Unknown",
        reason: cleaned,
        suggestion: "AI response parsing failed",
      };
    }

    await saveInsight(userId, "spending-risk", JSON.stringify(parsed));

    res.json({
      success: true,
      risk: parsed,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===============================
// Financial Forecast
// ===============================

const getFinancialForecast = async (req, res) => {
  try {
    const { userId } = req.params;

    const incomes = await IncomeModel.find({ userID: userId });
    const expenses = await ExpenseModel.find({ userID: userId }).populate(
      "categoryID"
    );

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    const summary = expenses.reduce((acc, item) => {
      const category = item.categoryID?.name || "Other";
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    const prompt = `
Create a 6-month financial forecast.

Income: ${totalIncome}
Expenses: ${totalExpenses}

Breakdown:
${JSON.stringify(summary, null, 2)}

Provide insights and recommendations.
`;

    const aiReply = await generateAIResponse(prompt);

    await saveInsight(userId, "financial-forecast", aiReply);

    res.json({
      success: true,
      forecast: aiReply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===============================
// Saving Opportunities
// ===============================

const detectSavingOpportunities = async (req, res) => {
  try {
    const { userId } = req.params;

    const incomes = await IncomeModel.find({ userID: userId });
    const expenses = await ExpenseModel.find({ userID: userId }).populate(
      "categoryID"
    );

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

    const summary = expenses.reduce((acc, item) => {
      const category = item.categoryID?.name || "Other";
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    const prompt = `
Find saving opportunities.

Income: ${totalIncome}

Expenses:
${JSON.stringify(summary, null, 2)}
`;

    const aiReply = await generateAIResponse(prompt);

    await saveInsight(userId, "saving-opportunities", aiReply);

    res.json({
      success: true,
      opportunities: aiReply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===============================
// Financial Health Score
// ===============================

const getFinancialHealthScore = async (req, res) => {
  try {
    const { userId } = req.params;

    const incomes = await IncomeModel.find({ userID: userId });
    const expenses = await ExpenseModel.find({ userID: userId }).populate(
      "categoryID"
    );

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    const savings = totalIncome - totalExpenses;

    const summary = expenses.reduce((acc, item) => {
      const category = item.categoryID?.name || "Other";
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    const prompt = `
Calculate a Financial Health Score (0–100).

Income: ${totalIncome}
Expenses: ${totalExpenses}
Savings: ${savings}

Breakdown:
${JSON.stringify(summary, null, 2)}
`;

    const aiReply = await generateAIResponse(prompt);

    await saveInsight(userId, "financial-health", aiReply);

    res.json({
      success: true,
      healthScore: aiReply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  askAI,
  getExpenseInsights,
  generateBudgetPlan,
  detectSpendingRisk,
  getFinancialForecast,
  detectSavingOpportunities,
  getFinancialHealthScore,
};