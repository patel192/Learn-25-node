const UserModel = require("../models/UserModel");
const TransactionModel = require("../models/TransactionModel");
const CategoryModel = require("../models/CategoryModel");

const getAdminReport = async () => {
  // Fetch users
  const users = await UserModel.find({});
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.is_active).length;
  const deactivatedUsers = totalUsers - activeUsers;

  // Fetch categories
  const categories = await CategoryModel.find({});
  const totalCategories = categories.length;

  // Fetch transactions
  const transactions = await TransactionModel.find({});
  const totalIncome = transactions
    .filter(tx => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);
  const totalExpenses = transactions
    .filter(tx => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  // Category distribution (for pie chart)
  const categoryMap = {};
  transactions.forEach(tx => {
    if (tx.type === "expense") {
      if (!categoryMap[tx.category]) categoryMap[tx.category] = 0;
      categoryMap[tx.category] += tx.amount;
    }
  });

  const categoryDistribution = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  const topCategory = categoryDistribution.reduce(
    (prev, current) => (prev.value > current.value ? prev : current),
    { name: "", value: 0 }
  ).name;

  // Most Active User
  const userActivity = {};
  transactions.forEach(tx => {
    if (!userActivity[tx.userID]) userActivity[tx.userID] = 0;
    userActivity[tx.userID]++;
  });

  let topUserId = null;
  let maxTx = 0;
  for (const [uid, count] of Object.entries(userActivity)) {
    if (count > maxTx) {
      maxTx = count;
      topUserId = uid;
    }
  }

  let topUser = null;
  if (topUserId) {
    topUser = await UserModel.findById(topUserId).select("name email");
  }

  return {
    totalUsers,
    activeUsers,
    deactivatedUsers,
    totalCategories,
    totalIncome,
    totalExpenses,
    categoryDistribution,
    topCategory,
    topUser,
  };
};

module.exports = { getAdminReport };
