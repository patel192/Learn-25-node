const RecurringModel = require("../models/RecurringModel");

/**
 * --- RECURRING CONTROLLER ---
 * Handles transactions that repeat, like monthly subscriptions or weekly bills.
 */

// Set up a new recurring transaction schedule
const createRecurring = async (req, res) => {
  try {
    const recurring = await RecurringModel.create(req.body);
    res.status(201).json({
      message: "Recurring transaction created",
      data: recurring,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating recurring transaction",
      error: err.message,
    });
  }
};

// Fetch all recurring setups for a specific user
const getRecurringByUser = async (req, res) => {
  try {
    const recurring = await RecurringModel.find({
      userId: req.params.userId,
    });
    res.status(200).json({
      data: recurring,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching recurring transactions",
    });
  }
};

// Stop a recurring transaction permanently
const deleteRecurring = async (req, res) => {
  try {
    await RecurringModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Recurring transaction deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting recurring transaction, ${error}`,
    });
  }
};

// Modify the details of an existing recurring transaction
const updateRecurring = async (req, res) => {
  try {
    const updated = await RecurringModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json({
      message: "Recurring updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Updating recurring",
    });
  }
};

// Get the next few payments that are coming due soon
const getUpcomingRecurring = async (req, res) => {
  try {
    const today = new Date();
    const upcoming = await RecurringModel.find({
      userId: req.params.userId,
      nextDate: { $gte: today },
    })
      .sort({ nextDate: 1 })
      .limit(5);
    res.json({ data: upcoming });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching upcoming payments",
    });
  }
};

// Quickly turn a recurring payment on or off
const toggleRecurringStatus = async (req, res) => {
  try {
    const recurring = await RecurringModel.findById(req.params.id);
    recurring.isActive = !recurring.isActive;
    await recurring.save();
    res.json({
      message: "Recurring status updated",
      data: recurring,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating recurring status",
    });
  }
};

module.exports = {
  createRecurring,
  getRecurringByUser,
  deleteRecurring,
  updateRecurring,
  getUpcomingRecurring,
  toggleRecurringStatus,
};

