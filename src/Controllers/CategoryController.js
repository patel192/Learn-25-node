const CategoryModel = require("../models/CategoryModel");

/**
 * --- CATEGORY CONTROLLER ---
 * Manages types of expenses/income like "Food", "Rent", or "Salary".
 */

// Create a new category tag
const AddCategory = async (req, res) => {
  try {
    const AddedCategory = await CategoryModel.create(req.body);
    res.status(201).json({
      message: "the category added successfully",
      data: AddedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// List all available categories
const GetAllCategory = async (req, res) => {
  try {
    const Allcategory = await CategoryModel.find();
    res.status(200).json({
      message: "the categories found successfully",
      data: Allcategory,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Get details for one specific category
const GetCategorybyID = async (req, res) => {
  try {
    const CategorybyID = await CategoryModel.findById(req.params.id);
    res.status(200).json({
      message: "the category found successfully",
      data: CategorybyID,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Delete a category from the system
const DeleteCategory = async (req, res) => {
  try {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "the Category deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

module.exports = {
  AddCategory,
  GetAllCategory,
  GetCategorybyID,
  DeleteCategory,
};