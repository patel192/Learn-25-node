const CategoryModel = require("../models/CategoryModel")
const categorySchema = require("../models/CategoryModel")
const AddCategory = async (req,res) =>{
    try{
        const AddedCategory = await CategoryModel.create(req.body)
        res.status(201).json({
            message:"the category added successfully",
            data:AddedCategory
        })
    }catch(err){
      res.status(500).json({
        message:err.message
      })
    }
}
const GetAllCategory = async (req,res) =>{
    try{
        const Allcategory = await CategoryModel.find().populate("userID")
        res.status(200).json({
            message:"the categories found successfully",
            data:Allcategory
        })

    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}
const GetCategorybyID = async (req,res) =>{
    try{
      const CategorybyID = await CategoryModel.findById(req.params.id)
      res.status(200).json({
        message:"the category found successfully",
        data:CategorybyID
      })
    }catch(err){
      res.status(404).json({
        message:err.message
      })
    }
}
const DeleteCategory = async (req,res) =>{
    try{
       const DeletedCategory = await CategoryModel.findByIdAndDelete(req.params.id)
       res.status(200).json({
        message:"the Category deleted successfully"
       })
    }catch(err){ 
        res.status(404).json({
            message:err.message
        })

    }
}
module.exports = {
    AddCategory,GetAllCategory,GetCategorybyID,DeleteCategory
}