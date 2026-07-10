const routes = require("express").Router();
const { createLog, getLogs } = require("../Controllers/SystemlogController");
const {requireAuth,requireRole} = require("../middleware/auth.middleware");

routes.post("/logs", requireAuth, createLog);
routes.get("/logs", requireAuth,requireRole("Admin"),getLogs);

module.exports = routes;

