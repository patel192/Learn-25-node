const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(express.json())
const allowedOrigins = "expense-manager-frontend-sw2e-pgujcrqo7.vercel.app" 
;

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
const userRoutes = require("./src/routes/UserRoutes")
const categoryRoutes = require("./src/routes/CategoryRoutes")
const expenseRoutes = require("./src/routes/ExpenseRoutes")
const incomeRoutes = require("./src/routes/IncomeRoutes")
const transactionRoutes = require("./src/routes/TransactionRoutes")
const budgetroutes = require("./src/routes/BudgetRoutes")
const adminReportRoutes = require("./src/routes/AdminReportRoutes")
const systemlogRoutes = require("./src/routes/SystemlogRoutes")
const recurringExpensesRoutes = require("./src/routes/RecurringExpensesRoutes")
const billRoutes = require("./src/routes/BillRoutes")
require("dotenv").config();
app.use("/api",categoryRoutes)
app.use("/api",userRoutes)
app.use("/api",expenseRoutes)
app.use("/api",incomeRoutes)
app.use("/api",transactionRoutes)
app.use("/api",budgetroutes)
app.use("/api",adminReportRoutes)
app.use("/api",systemlogRoutes)
app.use("/api",recurringExpensesRoutes)
app.use("/api",billRoutes)
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
    console.log("✅ Database connected...");
})
.catch((err) => {
    console.error("❌ Database connection error:", err);
});

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log("server started on port number",PORT)
})