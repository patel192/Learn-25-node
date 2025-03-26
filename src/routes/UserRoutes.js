const routes = require("express").Router()
const UserController = require("../Controllers/UserController")
routes.post("/user",UserController.SignupUser)
routes.get("/users",UserController.GetAllusers)
routes.get("/user/:id",UserController.GetuserbyId)
routes.delete("/user/:id",UserController.DeleteUser)
routes.post("/user/login",UserController.LoginUser)
routes.post("/user/forgotpassword",UserController.ForgotPassword)
routes.post("/user/resetpassword",UserController.Resetpassword)

module.exports = routes;