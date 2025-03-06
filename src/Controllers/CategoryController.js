
const CategoryModel = require("../models/CategoriesModel");

const addCategory = async (req, res) => {
  try {
    const addedCategory = await CategoryModel.create(req.body);
    res.status(201).json({
      message: "the category added successfully",
      data: addedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getCategory = async (req,res) =>{
  try{
    const Categories = await CategoryModel.find().populate();
    res.status(200).json({
      message:"category found successfully",
      data:Categories
    })
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}
module.exports = {
    addCategory,
    getCategory
}