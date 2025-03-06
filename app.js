const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const cors = require("cors");
app.use(cors());

const categoryRoutes = require("./src/routes/CategoryRoutes")
const userRoutes = require("./src/routes/UserRoutes")
const expenseRoutes = require("./src/routes/ExpenseRoutes")
const incomeRoutes = require("./src/routes/IncomeRoutes")

app.use(categoryRoutes)
app.use(userRoutes)
app.use(expenseRoutes)
app.use(incomeRoutes)


mongoose.connect("mongodb://localhost:27017/25_node_internship").then(()=>{
    console.log("database connected")
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number",PORT)
})