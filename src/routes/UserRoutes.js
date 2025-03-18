const routes = require("express").Router()
const UserController = require("../Controllers/UserController")
routes.post("/user",UserController.SignupUser)
routes.get("/users",UserController.GetAllusers)
routes.get("/user/:id",UserController.GetuserbyId)
routes.delete("/user/:id",UserController.DeleteUser)

module.exports = routes;