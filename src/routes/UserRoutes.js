const routes = require("express").Router();
const UserController = require("../Controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin")

// 🟢 Public routes
routes.post("/user", UserController.SignupUser);
routes.post("/user/login", UserController.LoginUser);
routes.post("/user/refresh-token", UserController.RefreshToken);
routes.post("/user/logout", UserController.LogoutUser);

// 🔒 Protected routes
routes.get("/users", authMiddleware,isAdmin, UserController.GetAllusers);
routes.get("/user/:id", authMiddleware, UserController.GetuserbyId);
routes.put("/user/:id", authMiddleware, UserController.UpdateUser);
routes.delete("/user/:id", authMiddleware, UserController.DeleteUser);

module.exports = routes;
