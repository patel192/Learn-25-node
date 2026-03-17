const PDFDocument = require("pdfkit");
const ExpenseModel = require("../models/ExpenseModel");
const IncomeModel = require("../models/IncomeModel");

const generateReport = async (req, res) => {
  try {
    const userId = req.params.userId;

    const expenses = await ExpenseModel.find({ userId });
    const income = await IncomeModel.find({ userId });

    const totalIncome = income.reduce((a, i) => a + i.amount, 0);
    const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=financial-report.pdf",
    );

    doc.pipe(res);
    doc.fontSize(22).text("Financial Report", { align: "center" });
    doc.moveDown();
    doc.fondSize(14).text(`Total Income: ${totalIncome}`);
    doc.text(`Total Expenses: ${totalExpenses}`);
    doc.text(`Balance: ${totalIncome - totalExpenses}`);

    doc.moveDown();
    doc.text("Expenses:");
    expenses.forEach((e) => {
      doc.text(`${e.title} - ${e.amount}`);
    });
    doc.end();
  } catch (error) {
    res.status(500).json({
      message: "Error generating report",
    });
  }
};

module.exports = { generateReport };
