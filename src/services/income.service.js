const IncomeModel = require("../models/IncomeModel");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const addIncome = async (data, userId) => {
  const incomeData = { ...data, userID: userId };
  const income = await IncomeModel.create(incomeData);
  return income;
};

const deleteIncome = async (incomeId, userId) => {
  const income = await IncomeModel.findById(incomeId);
  if (!income) {
    throw new NotFoundError("Income not found");
  }

  if (income.userID.toString() !== userId) {
    throw new ForbiddenError("You are not Authorized to delete this income");
  }

  await IncomeModel.findByIdAndDelete(incomeId);
};

const getIncomeById = async (incomeId, userId) => {
  const income = await IncomeModel.findById(incomeId);
  if (!income) {
    throw new NotFoundError("Income not found");
  }
  if (income.userID.toString() !== userId) {
    throw new ForbiddenError("Your are not authorized to delete this income");
  }
  return income;
};

const getIncomeByUserId = async (userId) => {
  return await IncomeModel.find({
    userID: userId,
  });
};

const getAllIncome = async () => {
    return await IncomeModel.find();
}
module.exports = {
  addIncome,
  deleteIncome,
  getIncomeById,
  getIncomeByUserId,
  getAllIncome
};
