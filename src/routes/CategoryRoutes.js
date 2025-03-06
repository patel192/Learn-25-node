const routes = require("express").Router()
const Categorycontroller = require("../Controllers/CategoryController")
const CategoryModel = require("../models/CategoriesModel")
routes.post('/category',Categorycontroller.addCategory)
routes.get('/categories',Categorycontroller.getCategory)
module.exports = routes