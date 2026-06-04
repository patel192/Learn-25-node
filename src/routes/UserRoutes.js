const routes = require("express").Router();
const UserController = require("../Controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/upload")

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
routes.post("/user/upload-profile/:id",authMiddleware,upload.single("profilePic"),UserController.UploadProfilePic);

module.exports = routes;

