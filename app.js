const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())

const userRoutes = require("./src/routes/UserRoutes")
const categoryRoutes = require("./src/routes/CategoryRoutes")
const expenseRoutes = require("./src/routes/ExpenseRoutes")
const incomeRoutes = require("./src/routes/IncomeRoutes")

app.use("/api",categoryRoutes)
app.use("/api",userRoutes)
app.use("/api",expenseRoutes)
app.use("/api",incomeRoutes)
mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("database connected...")
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log("server started on port number",PORT)
})