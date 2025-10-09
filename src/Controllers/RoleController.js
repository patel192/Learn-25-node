const RoleModel = require("../models/RoleModel")
const AddRole = async (req,res) => {
    try{
      const AddedRole = await RoleModel.create(req.body)
      res.status(201).json({
        message:"the role created successfully",
        data:AddedRole
      }
      )
    }catch(err){
       res.status(500).json({
        message:err.message
       })
    }
}
const GetAllroles = async (req,res) => {
  try{
     const Allroles = await RoleModel.find();
     res.status(200).json({
      message:"The roles Fetched successfully",
      data:Allroles
     })
  }catch(err){
     res.status(404).json({
      message:err.message
     })
  }
}
module.exports = {
    AddRole,GetAllroles
}