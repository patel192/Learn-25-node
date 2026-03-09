const { generateAIResponse } = require("../services/aiService");
const ExpenseModel = require("../models/ExpenseModel");
const IncomeModel = require("../models/IncomeModel");

// Normal Tesing API for Google Gemini Integration
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

const getExpenseInsights = async (req, res) => {
  try {
    const { userId } = req.params;

    // fetch user expenses
    const expenses = await ExpenseModel.find({ userID: userId }).populate(
      "categoryID",
    );

    if (!expenses || expenses.length === 0) {
      return res.json({
        success: true,
        insights: "No expenses available to analyze.",
      });
    }

    // summarize expenses by category
    const summary = expenses.reduce((acc, item) => {
      const category = item.categoryID?.name || "Other";

      acc[category] = (acc[category] || 0) + item.amount;

      return acc;
    }, {});

    const prompt = `
You are a financial advisor.

Analyze this expense summary and give financial insights and saving suggestions.

Expense Summary:
${JSON.stringify(summary, null, 2)}
`;

    const aiReply = await generateAIResponse(prompt);

    res.json({
      success: true,
      insights: aiReply,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      error: "Failed to generate AI insights",error,
    });
  }
};

const generateBudgetPlan = async (req,res) => {
  try{
 const {userId} = req.params;
 const incomes = await IncomeModel.find({userID:userId});
 const expenses = await ExpenseModel.find({userID:userId}).populate("categoryID");\

 const totalIncome = incomes.reduce((sum,i) => sum + i.amount,0);
 const summary = expenses.reduce((acc,item) => {
const category = item.categoryID?.name || "other";
acc[category] = (acc[category] || 0) + item.amount;
return acc;
 },{});

 const prompt = `
 You Are a Financial advisor.
  User monthly income : ${totalIncome}

  User expenses by category : ${JSON.stringify(summary,null,2)}

  create a recommended monthly budget plan using categories and  saving advice.

  Format response using markdown .
 `;

 const aiReply  = await generateAIResponse(prompt);
 res.json({
  success:true,
  budgetPlan:aiReply
 });
  }catch(error){
console.error(error)

res.status(500).json({
  success:false,
  error:"Failed to generate budget plan"
});
  }
};
module.exports = { askAI, getExpenseInsights,generateBudgetPlan };
