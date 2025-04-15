const SystemLog = require("../models/SystemlogModel");

// Add a log entry
exports.createLog = async (req, res) => {
  try {
    const { user, action, description } = req.body;
    const log = new SystemLog({ user, action, description });
    await log.save();
    res.status(201).json({ message: "Log entry created", log });
  } catch (err) {
    res.status(500).json({ error: "Failed to create log entry" });
  }
};

// Get all logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await SystemLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};
