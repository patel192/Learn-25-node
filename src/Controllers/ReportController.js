const PDFDocument = require("pdfkit");
const ExpenseModel = require("../models/ExpenseModel");
const IncomeModel = require("../models/IncomeModel");

const generateReport = async (req, res) => {
  try {
    const userId = req.user.id;

    // Grab all the data for this user
    const expenses = await ExpenseModel.find({
      userID: userId,
    }).sort({ date: -1 });

    const incomes = await IncomeModel.find({
      userID: userId,
    }).sort({ date: -1 });

    if (expenses.length === 0 && incomes.length === 0) {
      return res.status(404).json({
        message: "No financial data found",
      });
    }
    // Calculate the totals for the summary section
    const totalIncome = incomes.reduce((a, i) => a + i.amount, 0);
    const totalExpense = expenses.reduce((a, e) => a + e.amount, 0);

    // Create the PDF document
    const doc = new PDFDocument();

    // Tell the browser to expect a PDF file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=financial-report.pdf",
    );

    // Stream the PDF directly to the response
    doc.pipe(res);

    // --- PDF CONTENT ---
    doc.fontSize(20).text("Financial Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Total Income: ₹${totalIncome}`);
    doc.text(`Total Expenses: ₹${totalExpense}`);
    doc.text(`Balance: ₹${totalIncome - totalExpense}`);

    doc.moveDown();
    doc.fontSize(16).text("Detailed Expenses:");
    doc.moveDown(0.5);

    // List each individual expense
    expenses.forEach((e) => {
      doc.fontSize(12).text(`${e.description} - ₹${e.amount}`);
    });

    // Finalize the PDF file
    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({
      message: "Error generating report",
      error: error.message,
    });
  }
};

module.exports = { generateReport };
