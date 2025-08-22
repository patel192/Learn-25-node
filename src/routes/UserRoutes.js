const routes = require("express").Router();
const UserController = require("../Controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware")


// public routes
routes.post("/user", UserController.SignupUser);
routes.post("/user/login", UserController.LoginUser);
// protected routes
routes.get("/users",authMiddleware, UserController.GetAllusers);
routes.get("/user/:id",authMiddleware, UserController.GetuserbyId);
routes.delete("/user/:id",authMiddleware, UserController.DeleteUser);
routes.post("/user/forgotpassword",authMiddleware, UserController.ForgotPassword);
routes.post("/user/resetpassword",authMiddleware, UserController.Resetpassword);
routes.put("/user/:id",authMiddleware,UserController.UpdateUser)


module.exports = routes;
