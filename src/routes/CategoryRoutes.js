const routes = require("express").Router()
const CategoryController = require("../Controllers/CategoryController")
routes.post("/category",CategoryController.AddCategory)
routes.get("/categories",CategoryController.GetAllCategory)
routes.get("/category/:id",CategoryController.GetCategorybyID)
routes.delete("/category/:id",CategoryController.DeleteCategory)
module.exports = routes;