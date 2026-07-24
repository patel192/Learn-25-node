const TransactionModel = require("../models/TransactionModel");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");


const addTransaction = async (data, userId) => {
  const transactionData = {
    ...data,
    userID: userId,
  };

  return await TransactionModel.create(transactionData);
};

const getAllTransaction = async () => {
  return await TransactionModel.find().populate("userID");
};

const getTransactionById = async (transactionId, userId) => {
  const transaction = await TransactionModel.findById(transactionId);

  if (!transaction) {
    throw new NotFoundError("Transaction not found");
  }

  if (transaction.userID.toString() !== userId) {
    throw new ForbiddenError(
      "You are not authorized to access this transaction",
    );
  }

  return transaction;
};

const deleteTransaction = async (transactionId, userId) => {
  const transaction = await TransactionModel.findById(transactionId);

  if (!transaction) {
    throw new NotFoundError("Transaction not found");
  }

  if (transaction.userID.toString() !== userId) {
    throw new ForbiddenError(
      "You are not authorized to delete this transaction",
    );
  }

  await TransactionModel.findByIdAndDelete(transactionId);
};

const getTransactionByUserId = async (userId) => {
  return await TransactionModel.find({
    userID: userId,
  });
};

module.exports = {
  addTransaction,
  getAllTransaction,
  getTransactionById,
  deleteTransaction,
  getTransactionByUserId,
};
