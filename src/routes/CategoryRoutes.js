const routes = require("express").Router();
const CategoryController = require("../Controllers/CategoryController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// --- CATEGORY ENDPOINTS ---

// Creating a category is an admin-only job
routes.post(
  "/category",
  authMiddleware,
  isAdmin,
  CategoryController.AddCategory,
);

// Anyone logged in can see the categories
routes.get("/categories", authMiddleware, CategoryController.GetAllCategory);

// Look up details for one category
routes.get(
  "/category/:id",
  authMiddleware,
  CategoryController.GetCategorybyID,
);

// Removing a category also requires admin privileges
routes.delete(
  "/category/:id",
  authMiddleware,
  isAdmin,
  CategoryController.DeleteCategory,
);

module.exports = routes;