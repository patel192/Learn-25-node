const ExpenseModel = require("../models/ExpenseModel");
const IncomeModel = require("../models/IncomeModel");
const NotFoundError = require("../errors/NotFoundError");

const generateReport = async (doc, userId) => {
  const expenses = await ExpenseModel.find({
    userID: userId,
  }).sort({ date: -1 });

  const incomes = await IncomeModel.find({
    userID: userId,
  }).sort({ date: -1 });

  if (expenses.length === 0 && incomes.length === 0) {
    throw new NotFoundError("No financial data found");
  }

  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  doc.fontSize(20).text("Financial Report", {
    align: "center",
  });

  doc.moveDown();

  doc.fontSize(14).text(`Total Income: ₹${totalIncome}`);
  doc.text(`Total Expenses: ₹${totalExpense}`);
  doc.text(`Balance: ₹${totalIncome - totalExpense}`);

  doc.moveDown();

  doc.fontSize(16).text("Detailed Expenses:");

  doc.moveDown(0.5);

  expenses.forEach((expense) => {
    doc
      .fontSize(12)
      .text(`${expense.description} - ₹${expense.amount}`);
  });
};

module.exports = {
  generateReport,
};