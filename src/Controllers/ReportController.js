const PDFDocument = require("pdfkit");
const ExpenseModel = require("../models/ExpenseModel");
const IncomeModel = require("../models/IncomeModel");

/**
 * --- REPORT CONTROLLER ---
 * Generates downloadable PDF reports of a user's financial status.
 */

// Generate a full financial summary as a PDF file
const generateReport = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Grab all the data for this user
    const expenses = await ExpenseModel.find({ userId });
    const incomes = await IncomeModel.find({ userId });

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
      doc.fontSize(12).text(`${e.title} - ₹${e.amount}`);
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