const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const mailutil = require("../utiles/MailUtil")
const secret = "secret"
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
const ForgotPassword = async(req,res) => {
  console.log(req.body.email)
  const email = req.body.email;
  const founduser = await UserModel.findOne({email:email});
  if(founduser){
    const token = jwt.sign(founduser.toObject(),secret);
    console.log(token);
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailcontent = `<html>
    <a href="${url}">reset paasword</a>
    </html>`
    await mailutil.sendingMail(founduser.email,"reset password",mailcontent);
    res.json({
      message:"reset password link sended to the email"
    })
  }else{
    res.json({
      message:"user not found please register first"
    })
  }
}
const Resetpassword = async (req, res) => {
  const token = req.body.token; //decode --> email | id
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  //object -->email,id..
  //password encrypt...
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword,salt);

  const updatedUser = await UserModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPassword,
  });
  res.status(200).json({
    message: "password updated successfully..",
  });
};
module.exports = {
  Adduser,
  GetAllusers,
  GetuserbyId,
  DeleteUser,
  SignupUser,
  LoginUser,
  ForgotPassword,
  Resetpassword
};