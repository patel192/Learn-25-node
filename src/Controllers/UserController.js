const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
const secret = process.env.JWT_SECRET;

/**
 * --- USER CONTROLLER ---
 * Handles everything related to users: auth, profiles, and admin actions.
 */

// Fetch a list of all users in the system
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

// Look up a specific user by their unique ID
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

// Remove a user from the database
const DeleteUser = async (req, res) => {
  try {
    const Deleteduser = await UserModel.findByIdAndDelete(req.params.id);
    if (!Deleteduser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register a new user - handles password hashing automatically
const SignupUser = async (req, res) => {
  try {
    // Hash the password before saving so we never store plain text
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

// Authenticate user and issue JWT tokens in secure cookies
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email });

    // Check if user exists and password matches
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate both Access and Refresh tokens
    const accessToken = jwt.sign(
      { id: foundUser._id, role: foundUser.role || "User" },
      secret,
      { expiresIn: "1h" },
    );

    const refreshToken = jwt.sign(
      { id: foundUser._id },
      process.env.REFRESH_SECRET || "refresh_secret",
      { expiresIn: "7d" },
    );

    const { password: _, ...userData } = foundUser.toObject();
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 3600000,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 3600000,
    });

    res.status(200).json({
      message: "Login successful",
      token: accessToken,
      data: userData,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error logging in",
      error: err.message,
    });
  }
};

// Exchange a valid refresh token for a brand new access token
const RefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET || "refresh_secret",
    );
    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role || "User" },
      secret,
      { expiresIn: "1h" },
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "Token refreshed",
      token: newAccessToken,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

// Clear authentication cookies to log the user out
const LogoutUser = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.status(200).json({ message: "Logged out successfully" });
};

// Update user profile information
const UpdateUser = async (req, res) => {
  try {
    const { name, email, bio, profilePic } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, email, bio, profilePic },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

// Helper: Extract the S3 object key from a full S3 URL
const extractS3Key = (url) => {
  try {
    const urlObj = new URL(url);
    // The key is the pathname without the leading slash
    return urlObj.pathname.substring(1);
  } catch {
    return null;
  }
};

//Util function to upload profile picture to s3
const UploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Fetch current user to check for an existing profile picture
    const currentUser = await UserModel.findById(req.params.id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the old profile pic from S3 if one exists
    if (currentUser.profilePic) {
      const oldKey = extractS3Key(currentUser.profilePic);
      if (oldKey) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: oldKey,
            }),
          );
        } catch (deleteErr) {
          // Log but don't block the upload if old image deletion fails
          console.error("Failed to delete old profile pic from S3:", deleteErr.message);
        }
      }
    }

    const fileName = `profiles/${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }),
    );

    const imageUrl =
      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        profilePic: imageUrl,
      },
      { new: true },
    );

    res.status(200).json({
      message: "Profile image uploaded successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Upload failed",
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
  RefreshToken,
  LogoutUser,
  UpdateUser,
  UploadProfilePic
};

