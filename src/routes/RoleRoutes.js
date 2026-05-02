const routes = require("express").Router();
const RoleController = require("../Controllers/RoleController");

// --- USER ROLES ---

// Add a new role definition
routes.post("/role", RoleController.AddRole);

// Get a list of all defined roles
routes.get("/roles", RoleController.GetAllroles);

module.exports = routes;