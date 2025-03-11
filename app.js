const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())

const userRoutes = require("./src/routes/UserRoutes")
app.use("/api",userRoutes)
mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("database connected...")
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log("server started on port number",PORT)
})