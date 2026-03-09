const { generateAIResponse } = require("../services/aiService");
const ExpenseModel = require("../models/ExpenseModel");
const IncomeModel = require("../models/IncomeModel");

// ===============================
// AI Chat
// ===============================
const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    const aiReply = await generateAIResponse(message);

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

    res.json({
      success: true,
      insights: parsed,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      error: "Failed to generate AI insights",
    });
  }
};

// ===============================
// AI Budget Planner
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

    const surplus = totalIncome - totalExpenses;

    const prompt = `
You are a financial advisor.

Return ONLY JSON in this format:

{
 "snapshot": {
   "income": 0,
   "expenses": 0,
   "surplus": 0
 },
 "budgetPlan": [
   { "category": "", "recommended": 0 }
 ],
 "recommendations": []
}

User Monthly Income: ${totalIncome}

User Expenses by Category:
${JSON.stringify(summary, null, 2)}
`;

    const aiReply = await generateAIResponse(prompt);

    let parsed;

    try {
      parsed = JSON.parse(aiReply);
    } catch {
      parsed = {
        snapshot: {
          income: totalIncome,
          expenses: totalExpenses,
          surplus: surplus,
        },
        budgetPlan: [],
        recommendations: [aiReply],
      };
    }

    res.json({
      success: true,
      budgetPlan: parsed,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to generate budget plan",
    });
  }
};

module.exports = {
  askAI,
  getExpenseInsights,
  generateBudgetPlan,
};