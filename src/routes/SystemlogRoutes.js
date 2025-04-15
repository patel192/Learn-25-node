const routes = require("express").Router();
const { createLog, getLogs } = require("../Controllers/SystemlogController");

routes.post("/logs", createLog);
routes.get("/logs", getLogs);

module.exports = routes;
