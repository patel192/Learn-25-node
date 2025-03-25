const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const Adduser = async (req, res) => {
  try {
    const AddedUser = await UserModel.create(req.body);
    res.status(201).json({
      message: "the user is created successfully",
      data: AddedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetAllusers = async (req, res) => {
  try {
    const Allusers = await UserModel.find();
    res.status(200).json({
      message: "the users found successfully",
      data: Allusers,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const GetuserbyId = async (req, res) => {
  try {
    const UserbyID = await UserModel.findById(req.params.id);
    res.status(200).json({
      message: "the user found successfully",
      data: UserbyID,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const DeleteUser = async (req, res) => {
  try {
    const Deleteduser = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "the user deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const SignupUser = async (req, res) => {
  try {
    console.log("Received Signup Data:", req.body); // Debugging

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;

    const createdUser = await UserModel.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error",
      data: err,
    });
  }
};


const LoginUser = async (req,res) => {
  const email = req.body.email;
  const password = req.body.password;


  const foundUserFromEmail = await UserModel.findOne({ email: email }).populate("roleId")
  console.log(foundUserFromEmail);
  if (foundUserFromEmail != null) {
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
   
    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
}
module.exports = {
  Adduser,
  GetAllusers,
  GetuserbyId,
  DeleteUser,
  SignupUser,
  LoginUser
};