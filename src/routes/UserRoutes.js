const routes = require("express").Router();
const UserController= require("../Controllers/UserController");

// ✅ User Registration (Sign Up)
routes.post("/signup", UserController.SignUp);

// ✅ Get a single user by ID
routes.get("/user/:id", UserController.getUser);

// ✅ Get all users
routes.get("/users", UserController.getAllusers);

// ✅ Delete a user
routes.delete("/user/:id", UserController.deleteUser);

module.exports = routes;
