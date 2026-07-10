const CategoryModel = require("../models/CategoryModel");

const AddCategory = async (req, res) => {
  try {
    const existing = await CategoryModel.findOne({
      name:req.body.name,
      type:req.body.type
    });
    if(!existing){
      return res.status(409).json({
        message:"Category already exists"
      });
    }
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

const GetCategorybyID = async (req, res) => {
  try {
    const CategorybyID = await CategoryModel.findById(req.params.id);
    if(!CategorybyID){
      return res.status(404).json({
        message:"Category not found"
      });
    }
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

const DeleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if(!category){
      return res.status(404).json({
        message:"Category not found"
      });
    }
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
