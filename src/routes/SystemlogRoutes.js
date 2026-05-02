const routes = require("express").Router();
const { createLog, getLogs } = require("../Controllers/SystemlogController");

// --- SYSTEM AUDIT LOGS ---

// Add a new activity log entry
routes.post("/logs", createLog);

// View the history of system logs
routes.get("/logs", getLogs);

module.exports = routes;

