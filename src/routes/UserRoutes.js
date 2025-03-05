const routes = require("express").Router()
const UserController= require("../Controllers/UserController")
const UserModel = require("../models/UserModel")
routes.post("/user",UserController.addUser)
routes.get("/user/:id",UserController.getUser)
routes.get("/users",UserController.getAllusers)
routes.delete("/user/:id",UserController.deleteUser)
routes.post("/user",UserController.SignUp)
module.exports = routes