const routes = require("express").Router();
const UserController = require("../Controllers/UserController");

// Auth & User CRUD
routes.post("/user", UserController.SignupUser);
routes.get("/users", UserController.GetAllusers);
routes.get("/user/:id", UserController.GetuserbyId);
routes.delete("/user/:id", UserController.DeleteUser);
routes.post("/user/login", UserController.LoginUser);
routes.post("/user/forgotpassword", UserController.ForgotPassword);
routes.post("/user/resetpassword", UserController.Resetpassword);
routes.put("/user/:id",UserController.UpdateUser)


module.exports = routes;
