const RecurringModel = require("../models/RecurringModel");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");


const createRecurring = async (data, userId) => {
  const recurringData = {
    ...data,
    userId,
  };

  return await RecurringModel.create(recurringData);
};

const getRecurringByUser = async (userId) => {
  return await RecurringModel.find({
    userId,
  });
};

const deleteRecurring = async (id, userId) => {
  const recurring = await RecurringModel.findById(id);

  if (!recurring) {
    throw new NotFoundError("Recurring transaction not found");
  }

  if (recurring.userId.toString() !== userId) {
    throw new ForbiddenError(
      "You are not authorized to delete this recurring transaction"
    );
  }

  await RecurringModel.findByIdAndDelete(id);
};

const updateRecurring = async (id, data, userId) => {
  const recurring = await RecurringModel.findById(id);

  if (!recurring) {
    throw new NotFoundError("Recurring transaction not found");
  }

  if (recurring.userId.toString() !== userId) {
    throw new ForbiddenError(
      "You are not authorized to update this recurring transaction"
    );
  }

  return await RecurringModel.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

const getUpcomingRecurring = async (userId) => {
  return await RecurringModel.find({
    userId,
    nextDate: {
      $gte: new Date(),
    },
  })
    .sort({ nextDate: 1 })
    .limit(5);
};

const toggleRecurringStatus = async (id, userId) => {
  const recurring = await RecurringModel.findById(id);

  if (!recurring) {
    throw new NotFoundError("Recurring transaction not found");
  }

  if (recurring.userId.toString() !== userId) {
    throw new ForbiddenError(
      "You are not authorized to update this recurring transaction"
    );
  }

  recurring.isActive = !recurring.isActive;

  await recurring.save();

  return recurring;
};


module.exports = {
    createRecurring,
    getRecurringByUser,
    deleteRecurring,
    updateRecurring,
    getUpcomingRecurring,
    toggleRecurringStatus
}