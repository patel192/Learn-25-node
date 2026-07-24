const BillModel = require("../models/BillModel");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const addBill = async (data, userId) => {
  const billData = {
    ...data,
    userID: userId,
  };

  return await BillModel.create(billData);
};

const getAllBills = async () => {
  return await BillModel.find();
};

const getBillById = async (billId, userId) => {
  const bill = await BillModel.findById(billId);

  if (!bill) {
    throw new NotFoundError("Bill not found");
  }

  if (bill.userID.toString() !== userId) {
    throw new ForbiddenError(
      "You are not authorized to access this bill"
    );
  }

  return bill;
};

const deleteBill = async (billId, userId) => {
  const bill = await BillModel.findById(billId);

  if (!bill) {
    throw new NotFoundError("Bill not found");
  }

  if (bill.userID.toString() !== userId) {
    throw new ForbiddenError(
      "You are not authorized to delete this bill"
    );
  }

  await BillModel.findByIdAndDelete(billId);
};

const getBillByUserId = async (userId) => {
  return await BillModel.find({
    userID: userId,
  }).populate("userID");
};

module.exports = {
    addBill,
    getAllBills,
    getBillById,
    deleteBill,
    getBillByUserId
}