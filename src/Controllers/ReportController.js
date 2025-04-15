// Backend: Corrected getAdminReport Controller
const IncomeModel = require("../models/IncomeModel");
const ExpenseModel = require("../models/ExpenseModel");
const UserModel = require("../models/UserModel");

exports.getAdminReport = async (req, res) => {
  try {
    const users = await UserModel.find({});
    const totalUsers = users.length;
    const incomes = await IncomeModel.find();
    const expenses = await ExpenseModel.find().populate("categoryID");

    const activeUsers = users.filter((u) => u.is_active).length;
    const deactivatedUsers = totalUsers - activeUsers;

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Category distribution from ExpenseModel (not TransactionModel)
    const categoryMap = {};
    expenses.forEach((e) => {
      const categoryName = e.categoryID?.name; // Get the name from populated category
      if (categoryName) {
        categoryMap[categoryName] = (categoryMap[categoryName] || 0) + e.amount;
      }
    });
    
    const categoryDistribution = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

    // Most active user (based on total number of income + expense entries)
    const userActivity = {};
    [...incomes, ...expenses].forEach((item) => {
      userActivity[item.userID] = (userActivity[item.userID] || 0) + 1;
    });
    const mostActiveUserId = Object.entries(userActivity).sort((a, b) => b[1] - a[1])[0]?.[0];
    const mostActiveUser = mostActiveUserId ? await UserModel.findById(mostActiveUserId) : null;

    res.json({
      totalIncome,
      totalExpense,
      totalUsers,
      activeUsers,
      deactivatedUsers,
      categoryDistribution,
      mostActiveUser: mostActiveUser ? mostActiveUser.name : "N/A",
    });
  } catch (error) {
    console.error("Admin report error:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
