const routes = require("express").Router();
const RoleController = require("../Controllers/RoleController")
routes.post("/role",RoleController.AddRole)
routes.get("/roles",RoleController.GetAllroles)
module.exports = routes;