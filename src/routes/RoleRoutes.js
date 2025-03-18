const routes = require("express").Router();
const RoleController = require("../Controllers/RoleController")
routes.post("/role",RoleController.AddRole)
module.exports = routes;