const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailutil = require("../utiles/MailUtil");
const secret = "secret";

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
    console.log("Received Signup Data:", req.body);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;

    // Save user with roleId
    const createdUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    await mailutil.sendingMail(
      createdUser.email,
      "Welcome to Expense Manager",
      "This is Welcome Email"
    );

    const populatedUser = await UserModel.findById(createdUser._id);

    res.status(201).json({
      message: "User created successfully",
      data: populatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isMatch = bcrypt.compareSync(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login success",
      data: foundUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error logging in",
      error: err.message,
    });
  }
};
const ForgotPassword = async (req, res) => {
  console.log(req.body.email);
  const email = req.body.email;
  const founduser = await UserModel.findOne({ email: email });
  if (founduser) {
    const token = jwt.sign(founduser.toObject(), secret);
    console.log(token);
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailcontent = `<html>
    <a href="${url}">reset paasword</a>
    </html>`;
    await mailutil.sendingMail(founduser.email, "reset password", mailcontent);
    res.json({
      message: "reset password link sended to the email",
    });
  } else {
    res.json({
      message: "user not found please register first",
    });
  }
};
const Resetpassword = async (req, res) => {
  const token = req.body.token; //decode --> email | id
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  //object -->email,id..
  //password encrypt...
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  const updatedUser = await UserModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPassword,
  });
  res.status(200).json({
    message: "password updated successfully..",
  });
};

const UpdateUser = async (req, res) => {
  try {
    const { name, email, bio, profilePic } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        bio,
        profilePic, // <-- save Cloudinary URL if provided
      },
      { new: true } // return updated doc
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user",
      error: err.message,
    });
  }
};


module.exports = {
  GetAllusers,
  GetuserbyId,
  DeleteUser,
  SignupUser,
  LoginUser,
  ForgotPassword,
  Resetpassword,
  UpdateUser,
};
