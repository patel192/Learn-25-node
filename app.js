const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// --- ROUTE IMPORTS ---
const userRoutes = require("./src/routes/UserRoutes");
const categoryRoutes = require("./src/routes/CategoryRoutes");
const expenseRoutes = require("./src/routes/ExpenseRoutes");
const recurringRoutes = require("./src/routes/RecurringRoutes");
const incomeRoutes = require("./src/routes/IncomeRoutes");
const transactionRoutes = require("./src/routes/TransactionRoutes");
const budgetRoutes = require("./src/routes/BudgetRoutes");
const systemlogRoutes = require("./src/routes/SystemlogRoutes");
const billRoutes = require("./src/routes/BillRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const reportRoutes = require("./src/routes/ReportRoutes");

const app = express();

// --- BASIC MIDDLEWARE ---
// Standard stuff to handle JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Just a quick check to see if the server is breathing
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// --- CORS CONFIGURATION ---
// We only want to allow requests from our trusted frontend apps
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-manager-frontend-sw2e.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is allowed or if it's a local/preview build
      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://localhost") ||
        /\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Need this for cookies to work across domains
  }),
);

// --- API ROUTES ---
// Registering all the different modules of the app
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
app.use("/api", recurringRoutes);
app.use("/api", incomeRoutes);
app.use("/api", transactionRoutes);
app.use("/api", budgetRoutes);
app.use("/api", systemlogRoutes);
app.use("/api", billRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", reportRoutes);

// Exporting so the server or tests can pick it up
module.exports = app;

