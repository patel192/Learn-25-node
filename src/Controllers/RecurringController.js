const RecurringModel = require("../models/RecurringModel");
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

const deleteRecurring = async (req, res) => {
  try {
    await RecurringModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Recurring transaction deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting recurring transaction ,${error}`,
    });
  }
};

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
module.exports = {
  createRecurring,
  getRecurringByUser,
  deleteRecurring,
  updateRecurring
};
