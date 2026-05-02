const SystemLog = require("../models/SystemlogModel");

/**
 * --- SYSTEM LOG CONTROLLER ---
 * Keeps a paper trail of what's happening in the app for auditing and debugging.
 */

// Save a new event log to the database
const createLog = async (req, res) => {
  try {
    const { user, action, description } = req.body;
    const log = new SystemLog({ user, action, description });
    await log.save();
    res.status(201).json({ message: "Log entry created", log });
  } catch (err) {
    res.status(500).json({ error: "Failed to create log entry" });
  }
};

// Retrieve all logs, newest ones first
const getLogs = async (req, res) => {
  try {
    const logs = await SystemLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

module.exports = {
  createLog,
  getLogs,
};

