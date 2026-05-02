const routes = require("express").Router();
const UserController = require("../Controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

/**
 * --- USER & AUTHENTICATION ---
 */

// --- PUBLIC ROUTES ---
// These are accessible without being logged in (Signup, Login, etc.)
routes.post("/user", UserController.SignupUser);
routes.post("/user/login", UserController.LoginUser);
routes.post("/user/refresh-token", UserController.RefreshToken);
routes.post("/user/logout", UserController.LogoutUser);

// --- PROTECTED ROUTES ---
// You need a valid token to reach these
routes.get("/users", authMiddleware, isAdmin, UserController.GetAllusers);
routes.get("/user/:id", authMiddleware, UserController.GetuserbyId);
routes.put("/user/:id", authMiddleware, UserController.UpdateUser);
routes.delete("/user/:id", authMiddleware, UserController.DeleteUser);

module.exports = routes;

