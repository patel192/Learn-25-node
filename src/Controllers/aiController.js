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
      "categoryID",
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
      error: error.message,
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
      "categoryID",
    );

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

    const summary = expenses.reduce((acc, item) => {
      const category = item.categoryID?.name || "Other";
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    const totalExpenses = Object.values(summary).reduce((sum, v) => sum + v, 0);

    const surplus = totalIncome - totalExpenses;

    const prompt = `
You are a financial advisor AI.

Return ONLY valid JSON.
Do NOT include markdown.
Do NOT include explanation.

Format:

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

User Expenses by Category:
${JSON.stringify(summary, null, 2)}
`;

    const aiReply = await generateAIResponse(prompt);

    // remove markdown formatting if Gemini adds it
    let cleaned = aiReply
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.log("AI JSON parse error:", err);

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

    res.json({
      success: true,
      budgetPlan: parsed,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: `Failed to generate budget plan ${error.message}`,
    });
  }
};

// Overspending detection
const detectSpendingRisk = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch income
    const incomes = await IncomeModel.find({ userID: userId });

    // Fetch expenses
    const expenses = await ExpenseModel.find({ userID: userId }).populate(
      "categoryID",
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

    // Total income
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

    // Expense summary
    const summary = expenses.reduce((acc, item) => {
      const category = item.categoryID?.name || "Other";
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    const prompt = `
You are a financial risk advisor.

Analyze this spending data and detect overspending risk.

User Monthly Income: ${totalIncome}

User Expenses by Category:
${JSON.stringify(summary, null, 2)}

Return ONLY JSON format:

{
 "riskLevel": "Low | Medium | High",
 "category": "category name",
 "reason": "why this is risky",
 "suggestion": "financial advice"
}
`;

    const aiReply = await generateAIResponse(prompt);

    // Clean AI response
    const cleaned = aiReply.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      parsed = {
        riskLevel: "Unknown",
        category: "Unknown",
        reason: cleaned,
        suggestion: "AI response parsing failed.",
      };
    }

    res.json({
      success: true,
      risk: parsed,
    });
  } catch (error) {
    console.error("AI Risk Error:", error);

    res.status(500).json({
      success: false,
      error: `Failed to detect spending risk ${error.message}`,
    });
  }
};


// Financial Forecast For Future

const getFinancialForecast = async (req,res) => {
  try{
   const {userId} = req.params;

   const incomes = await IncomeModel.find({userID:userId});

   const expenses = await ExpenseModel.find({userID:userId});

   if(!incomes.length){
    return res.json({
      success:true,
      forecast:"No income available to generate financial forecast"
    });
   }
   const totalIncome = incomes.reduce((sum,i)=> sum + i.amount,0);
   const totalExpenses = expenses.reduce((sum,e) => sum + e.amount,0);

   const summary = expenses.reduce((acc,item) => {
    const category = item.categoryID?.name || "Other";
    acc[category] = (acc[categoryID] || 0) + item.amount;
    return acc;
   },{});

   const prompt = `
You are a professional financial advisor.

User financial data:

Monthly Income: ${totalIncome}

Total Expenses: ${totalExpenses}

Expense Breakdown:
${JSON.stringify(summary, null, 2)}

Analyze this data and create a financial forecast for the next 6 months.

Include:

1. Expected savings projection
2. Potential financial risks
3. Suggestions to improve savings
4. Key financial insights

Format the response using markdown with headings and bullet points.
`;

const aiReply = await generateAIResponse(prompt);

res.json({
  success:true,
  forecast:aiReply
});
  }catch(error){
   console.error("AI Forecast Error:",error);
   res.status(500).json({
    success:false,
    error:`Failed to generate financiall forecast ${error}`
   });
  }
}
module.exports = {
  askAI,
  getExpenseInsights,
  generateBudgetPlan,
  detectSpendingRisk,
  getFinancialForecast
};
