const TransactionModel = require("../models/TransactionModel");

const AddTransaction = async (req, res) => {
  try {
    const transactionData = {...req.body,userID:req.user.id};
    const AddeTransaction = await TransactionModel.create(transactionData);
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

const GettransactionbyID = async (req, res) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id);
    if(!transaction){
      return res.status(404).json({
        message:"Transaction not found"
      });
    }
    if(transaction.userID.toString() !== req.user.id){
      return res.status(403).json({
        message:"You are not authorized to access this transaction"
      });
    }
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

const DeleteTransaction = async (req, res) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id);
    if(!transaction){
      return res.status(404).json({
        message:"Transaction not found"
      });
    }
    if(transaction.userID.toString() !== req.user.id){
      return res.status(403).json({
        message:"Forbidden: You are not authorized to delete this transaction"
      })
    }
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

const TransactionByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const Transactions = await TransactionModel.find({
      userID:userId,
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

