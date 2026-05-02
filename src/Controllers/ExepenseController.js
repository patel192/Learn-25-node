const ExpenseModel = require("../models/ExpenseModel");

/**
 * --- EXPENSE CONTROLLER ---
 * Handles all the CRUD operations for user expenses, including filtering.
 */

// Save a new expense to the database
const AddExpense = async (req, res) => {
  try {
    const AddedExpense = await ExpenseModel.create(req.body);
    res.status(201).json({
      message: "the expense added successfully",
      data: AddedExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Fetch every single expense (admin level or debug use usually)
const GetAllExpenses = async (req, res) => {
  try {
    const AllExpenses = await ExpenseModel.find().populate("categoryID");
    res.status(200).json({
      message: "The expenses fetched successfully",
      data: AllExpenses,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Remove an expense, but only if the user actually owns it
const DeleteExpense = async (req, res) => {
  try {
    const expense = await ExpenseModel.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Safety check: make sure the person deleting this is the owner
    if (expense.userID.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this expense",
      });
    }

    await ExpenseModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update existing expense details with ownership check
const UpdateExpense = async (req, res) => {
  try {
    const expense = await ExpenseModel.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Ownership check before allowing any changes
    if (expense.userID.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this expense",
      });
    }

    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json({
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Pull details for one specific expense
const GetExpensebyID = async (req, res) => {
  try {
    const ExpensebyID = await ExpenseModel.findById(req.params.id);
    res.status(200).json({
      message: "The expense fetched successfully",
      data: ExpensebyID,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// The heavy lifter: fetches user expenses with optional filters like date and category
const GetExpensebyUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, categoryID, minAmount, maxAmount } = req.query;

    let query = { userID: userId };

    // Filter by date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Filter by category
    if (categoryID) {
      query.categoryID = categoryID;
    }

    // Filter by amount range
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }

    const expenses = await ExpenseModel.find(query)
      .populate("userID categoryID")
      .sort({ date: -1 });

    if (expenses.length === 0) {
      return res.status(200).json({
        message: "No Expenses Found matching filters",
        data: [],
      });
    }

    res.status(200).json({
      message: "Expenses Found Successfully",
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Quick look at the last 5 expenses for the dashboard
const GetRecentExpenses = async (req, res) => {
  try {
    const recentExpenses = await ExpenseModel.find({ userID: req.params.userId })
      .sort({ date: -1 }) // newest first
      .limit(5); // limit to 5 results

    res.status(200).json({
      success: true,
      data: recentExpenses,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  AddExpense,
  GetAllExpenses,
  DeleteExpense,
  UpdateExpense,
  GetExpensebyID,
  GetExpensebyUserId,
  GetRecentExpenses,
};