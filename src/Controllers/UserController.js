const UserModel = require("../models/UserModel")

const addUser = async (req,res) =>{
  const addUser = await UserModel.create(req.body);
  res.json({
    message:"the user is created",
    data:addUser
  })
}

const getUser = async (req,res) =>{
  const getuser = await UserModel.findById(req.params.id);
  res.json({
    message:"user found successfully",
    data:getuser,
  })
}
const getAllusers = async (req,res) => {
  const getallUser = await UserModel.find();
  res.json({
    message:"data fetched successfully",
    data:getallUser,
  })
}
const deleteUser = async (req,res) => {
  const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
  res.json({
    message:"the user is deleted successfully",
    data:deletedUser
  })
}
const SignUp = async (req,res) =>{
  const createdUser = await UserModel.create(req.body);
  res.status(201).json({
    message:"user created successfully",
    data :createdUser
  })
}
module.exports = {
  addUser,
  getUser,
  getAllusers,
  deleteUser,
  SignUp
}