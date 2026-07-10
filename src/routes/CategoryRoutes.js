const routes = require("express").Router();
const CategoryController = require("../Controllers/CategoryController");
const {requireAuth,requireRole} = require("../middleware/auth.middleware");

routes.post("/category",requireAuth,requireRole("Admin"),CategoryController.AddCategory);
routes.get("/categories", requireAuth, CategoryController.GetAllCategory);
routes.get("/category/:id",requireAuth,CategoryController.GetCategorybyID);
routes.delete("/category/:id",requireAuth,requireRole("Admin"),CategoryController.DeleteCategory);

module.exports = routes;
