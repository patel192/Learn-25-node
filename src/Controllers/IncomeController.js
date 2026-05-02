const IncomeModel = require("../models/IncomeModel");

/**
 * --- INCOME CONTROLLER ---
 * Keeps track of all the money coming in (Salary, Freelancing, etc.).
 */

// Record a new source of income
const AddIncome = async (req, res) => {
  try {
    const AddedIncome = await IncomeModel.create(req.body);
    res.status(201).json({
      message: "the income is added successfully",
      data: AddedIncome,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Fetch every income record for every user (usually for admin)
const GetAllincome = async (req, res) => {
  try {
    const Allincome = await IncomeModel.find();
    res.status(200).json({
      message: "the income found successfully",
      data: Allincome,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Find a specific income entry by its ID
const GetIncomebyID = async (req, res) => {
  try {
    const IncomebyID = await IncomeModel.findById(req.params.id);
    res.status(200).json({
      message: "the income found successfully",
      data: IncomebyID,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Remove an income entry from the records
const DeleteIncome = async (req, res) => {
  try {
    await IncomeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "the income deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Pull all income records belonging to a specific user
const GetIncomebyUserID = async (req, res) => {
  try {
    const IncomebyUserID = await IncomeModel.find({
      userID: req.params.userId,
    }).populate("userID");

    if (IncomebyUserID.length === 0) {
      res.status(404).json({
        message: "No Income Found",
      });
    } else {
      res.status(200).json({
        message: "Income Found Successfully",
        data: IncomebyUserID,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  AddIncome,
  GetAllincome,
  GetIncomebyID,
  DeleteIncome,
  GetIncomebyUserID,
};

