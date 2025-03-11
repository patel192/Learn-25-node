const routes = require("express").Router()
const UserController = require("../Controllers/UserController")
routes.post("/user",UserController.Adduser)
routes.get("/users",UserController.GetAllusers)
module.exports = routes;