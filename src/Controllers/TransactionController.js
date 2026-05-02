const TransactionModel = require("../models/TransactionModel");

/**
 * --- TRANSACTION CONTROLLER ---
 * Broad handler for any kind of money movement in the system.
 */

// Record a new transaction
const AddTransaction = async (req, res) => {
  try {
    const AddeTransaction = await TransactionModel.create(req.body);
    res.status(201).json({
      message: "the Transaction is added successfully",
      data: AddeTransaction,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Fetch every transaction recorded (admin use)
const GetAlltransaction = async (req, res) => {
  try {
    const AllTransaction = await TransactionModel.find().populate("userID");
    res.status(200).json({
      message: "the Transactions fetched successfully",
      data: AllTransaction,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Get details for one specific transaction
const GettransactionbyID = async (req, res) => {
  try {
    const TransactionbyID = await TransactionModel.findById(req.params.id);
    res.status(200).json({
      message: "the transaction found successfully",
      data: TransactionbyID,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Remove a transaction entry
const DeleteTransaction = async (req, res) => {
  try {
    await TransactionModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "the transaction deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Get all the transactions for a specific user
const TransactionByUserId = async (req, res) => {
  try {
    const Transactions = await TransactionModel.find({
      userID: req.params.userId,
    });
    res.status(200).json({
      message: "Transactions Fetched Successfully",
      data: Transactions,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  AddTransaction,
  GetAlltransaction,
  GettransactionbyID,
  DeleteTransaction,
  TransactionByUserId,
};

