const PDFDocument = require("pdfkit");
const ExpenseModel = require("../models/ExpenseModel");
const IncomeModel = require("../models/IncomeModel");

const generateReport = async (req, res) => {
  try {

    const userId = req.params.userId;

    const expenses = await ExpenseModel.find({ userId });
    const incomes = await IncomeModel.find({ userId });

    const totalIncome = incomes.reduce((a, i) => a + i.amount, 0);
    const totalExpense = expenses.reduce((a, e) => a + e.amount, 0);

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=financial-report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("Financial Report", { align: "center" });

    doc.moveDown();

    doc.text(`Total Income: ₹${totalIncome}`);
    doc.text(`Total Expenses: ₹${totalExpense}`);
    doc.text(`Balance: ₹${totalIncome - totalExpense}`);

    doc.moveDown();

    doc.text("Expenses:");

    expenses.forEach((e) => {
      doc.text(`${e.title} - ₹${e.amount}`);
    });

    doc.end();

  } catch (error) {

    console.error("PDF generation error:", error);

    res.status(500).json({
      message: "Error generating report",
      error: error.message
    });

  }
};

module.exports = { generateReport };