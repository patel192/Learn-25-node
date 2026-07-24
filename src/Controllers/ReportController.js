const PDFDocument = require("pdfkit");
const asyncHandler = require("../middleware/asyncHandler");
const ReportService = require("../services/report.service");

const generateReport = asyncHandler(async (req, res) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=financial-report.pdf"
  );

  doc.pipe(res);

  await ReportService.generateReport(doc, req.user.id);

  doc.end();
});

module.exports = {
  generateReport,
};