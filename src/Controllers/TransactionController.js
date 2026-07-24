const asyncHandler = require("../middleware/asyncHandler");
const TransactionService = require("../services/transaction.service");
const {sendSuccess} = require("../utiles/response");

const AddTransaction = asyncHandler(async (req, res) => {
  const transaction = await TransactionService.addTransaction(
    req.body,
    req.user.id
  );

  return sendSuccess(
    res,
    201,
    "Transaction added successfully",
    transaction
  );
});

const GetAlltransaction = asyncHandler(async (req, res) => {
  const transactions = await TransactionService.getAllTransaction();

  return sendSuccess(
    res,
    200,
    "Transactions fetched successfully",
    transactions
  );
});

const GettransactionbyID = asyncHandler(async (req, res) => {
  const transaction = await TransactionService.getTransactionById(
    req.params.id,
    req.user.id
  );

  return sendSuccess(
    res,
    200,
    "Transaction found successfully",
    transaction
  );
});

const DeleteTransaction = asyncHandler(async (req, res) => {
  await TransactionService.deleteTransaction(
    req.params.id,
    req.user.id
  );

  return sendSuccess(
    res,
    200,
    "Transaction deleted successfully"
  );
});

const TransactionByUserId = asyncHandler(async (req, res) => {
  const transactions = await TransactionService.getTransactionByUserId(
    req.user.id
  );

  return sendSuccess(
    res,
    200,
    "Transactions fetched successfully",
    transactions
  );
});

module.exports = {
  AddTransaction,
  GetAlltransaction,
  GettransactionbyID,
  DeleteTransaction,
  TransactionByUserId,
};

