const CategoryModel = require("../models/CategoryModel");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");


const addCategory = async (data) => {
  const existing = await CategoryModel.findOne({
    name: data.name,
    type: data.type,
  });

  if (existing) {
    throw new ConflictError("Category already exists");
  }

  const category = await CategoryModel.create(data);

  return category;
};

const getAllCategory = async () => {
  return await CategoryModel.find();
};

const getCategoryById = async (id) => {
  const category = await CategoryModel.findById(id);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category;
};

const deleteCategory = async (id) => {
  const category = await CategoryModel.findById(id);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  await CategoryModel.findByIdAndDelete(id);
};

module.exports = {
    addCategory,
    getAllCategory,
    getCategoryById,
    deleteCategory
}