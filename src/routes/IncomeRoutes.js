const routes = require("express").Router()
const IncomeController = require("../Controllers/IncomeController")
const IncomeModel = require("../models/IncomeModel")
routes.post("/income",IncomeController.addIncome)
module.exports = routes