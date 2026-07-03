const routes = require("express").Router();
const UserController = require("../Controllers/UserController");
const {requireAuth,requireRole } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload")

routes.post("/user", UserController.SignupUser);
routes.post("/user/login", UserController.LoginUser);
routes.post("/user/refresh-token", UserController.RefreshToken);
routes.post("/user/logout", UserController.LogoutUser);


routes.get("/users", requireAuth,requireRole("Admin"),UserController.GetAllusers);
routes.get("/user/:id",requireAuth,UserController.GetuserbyId);
routes.put("/user/:id",requireAuth,UserController.UpdateUser);
routes.delete("/user/:id",requireAuth,UserController.DeleteUser);
routes.post("/user/upload-profile/:id",requireAuth,upload.single("profilePic"),UserController.UploadProfilePic);
module.exports = routes;
