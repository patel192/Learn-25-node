const UserModel = require("../models/UserModel")
const Adduser = async (req,res) =>{
    try{ 
         const AddedUser = await UserModel.create(req.body);
         res.status(201).json({
         message:"the user is created successfully",
         data:AddedUser
})
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
const GetAllusers = async (req,res) =>{
    try{
        const Allusers = await UserModel.find()
        res.status(200).json({
            message:"the users found successfully",
            data:Allusers
        })

    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}
const GetuserbyId = async (req,res) =>{
    try{
      const UserbyID = await UserModel.findById(req.params.id)
      res.status(200).json({
        message:"the user found successfully",
        data:UserbyID
      })
    }catch(err){
      res.status(404).json({
        message:err.message
      })
    }
}
const DeleteUser = async (req,res) =>{
    try{
       const Deleteduser = await UserModel.findByIdAndDelete(req.params.id)
       res.status(200).json({
        message:"the user deleted successfully"
       })
    }catch(err){ 
        res.status(404).json({
            message:err.message
        })

    }
}
module.exports = {
    Adduser,GetAllusers,GetuserbyId,DeleteUser
}