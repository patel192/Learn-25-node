const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// Health endpoint (for CI + monitoring)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// CORS setup (unchanged)
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-manager-frontend-sw2e.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

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
    credentials: true,
  }),
);

// Routes (unchanged)
const userRoutes = require("./src/routes/UserRoutes");
const categoryRoutes = require("./src/routes/CategoryRoutes");
const expenseRoutes = require("./src/routes/ExpenseRoutes");
const incomeRoutes = require("./src/routes/IncomeRoutes");
const transactionRoutes = require("./src/routes/TransactionRoutes");
const budgetRoutes = require("./src/routes/BudgetRoutes");
const adminReportRoutes = require("./src/routes/AdminReportRoutes");
const systemlogRoutes = require("./src/routes/SystemlogRoutes");
const recurringExpensesRoutes = require("./src/routes/RecurringExpensesRoutes");
const billRoutes = require("./src/routes/BillRoutes");

app.use("/api", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
app.use("/api", incomeRoutes);
app.use("/api", transactionRoutes);
app.use("/api", budgetRoutes);
app.use("/api", adminReportRoutes);
app.use("/api", systemlogRoutes);
app.use("/api", recurringExpensesRoutes);
app.use("/api", billRoutes);

// DB connection
const mongoUri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

// EXPORT APP (important)
module.exports = app;
