const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// ===================== Get All Users =====================
const GetAllusers = async (req, res) => {
  try {
    const Allusers = await UserModel.find();
    res.status(200).json({
      message: "Users found successfully",
      data: Allusers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===================== Get User by ID =====================
const GetuserbyId = async (req, res) => {
  try {
    const UserbyID = await UserModel.findById(req.params.id);
    if (!UserbyID) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "User found successfully",
      data: UserbyID,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===================== Delete User =====================
const DeleteUser = async (req, res) => {
  try {
    const Deleteduser = await UserModel.findByIdAndDelete(req.params.id);
    if (!Deleteduser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===================== Signup User =====================
const SignupUser = async (req, res) => {
  try {
    console.log("Received Signup Data:", req.body);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const createdUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "User",
    });
    res.status(201).json({
      message: "User created successfully",
      data: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

// ===================== Login User =====================
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

    const token = jwt.sign(
      { id: foundUser._id, role: foundUser.role || "User" },
      secret,
      { expiresIn: "1h" }
    );

    const { password: _, ...userData } = foundUser.toObject();

    res.status(200).json({
      message: "Login successful",
      token,
      data: userData,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
// ===================== Update User =====================
const UpdateUser = async (req, res) => {
  try {
    const { name, email, bio, profilePic } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, email, bio, profilePic },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

module.exports = {
  GetAllusers,
  GetuserbyId,
  DeleteUser,
  SignupUser,
  LoginUser,
  UpdateUser,
};
