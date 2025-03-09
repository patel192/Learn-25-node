const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const cors = require("cors");

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const categoryRoutes = require("./src/routes/CategoryRoutes")
const userRoutes = require("./src/routes/UserRoutes")
const expenseRoutes = require("./src/routes/ExpenseRoutes")
const incomeRoutes = require("./src/routes/IncomeRoutes")
const transactionRoutes = require("./src/routes/TransactionRoutes")
const budgetRoutes = require("./src/routes/BudgetRouter")

// ✅ Fixed all routes
app.use("/api/category", categoryRoutes)
app.use("/api/user", userRoutes)
app.use("/api/expense", expenseRoutes)
app.use("/api/income", incomeRoutes)
app.use("/api/transaction", transactionRoutes)
app.use("/api/budget", budgetRoutes)

// ✅ Connect MongoDB
mongoose.connect("mongodb://localhost:27017/25_node_internship").then(()=>{
    console.log("Database Connected ✅")
})

// ✅ Start the server
const PORT = 3000
app.listen(PORT,()=>{
    console.log("Server started on port number",PORT)
})
