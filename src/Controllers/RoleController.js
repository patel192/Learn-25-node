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
module.exports = {
    AddRole
}