const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ Allowed origins for both local & production
const allowedOrigins = [
  "http://localhost:5173", // local development
  "https://expense-manager-frontend-sw2e.vercel.app", // production domain
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or server-to-server requests

      // Allow localhost and vercel preview deployments
      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://localhost") ||
        /\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Import routes
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

// ✅ Use routes with prefix
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

// ✅ Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected...");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
