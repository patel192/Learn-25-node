const routes = require("express").Router()
const CategoryController = require("../Controllers/CategoryController")
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin")
routes.post("/category",authMiddleware,isAdmin,CategoryController.AddCategory)
routes.get("/categories",authMiddleware,CategoryController.GetAllCategory)
routes.get("/category/:id",authMiddleware,CategoryController.GetCategorybyID)
routes.delete("/category/:id",authMiddleware,isAdmin,CategoryController.DeleteCategory)
module.exports = routes;