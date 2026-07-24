const SystemLog = require("../models/SystemlogModel");

const createLog = async (req, res) => {
  try {
    const user = req.user.id;
    const { action, description } = req.body;
    const log = new SystemLog({ user, action, description });
    await log.save();
    res.status(201).json({ message: "Log entry created", log });
  } catch{
    res.status(500).json({ error: "Failed to create log entry" });
  }
};

const getLogs = async (req, res) => {
  try {
    const logs = await SystemLog.find().sort({ createdAt: -1 });
    res.status(200).json({
    success:true,
    message:"Logs fetched successfully",
    data:logs
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

module.exports = {
  createLog,
  getLogs,
};

