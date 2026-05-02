const BillModel = require("../models/BillModel");

/**
 * --- BILL CONTROLLER ---
 * Manages utility bills and other payments.
 */

// Add a new bill to the system
const AddBill = async (req, res) => {
  try {
    const AddedBill = await BillModel.create(req.body);
    res.status(201).json({
      message: "the bill added successfully",
      data: AddedBill,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get every bill in the database
const GetAllBills = async (req, res) => {
  try {
    const AllBills = await BillModel.find();
    res.status(200).json({
      message: "the bills fetched successfully",
      data: AllBills,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Find a single bill using its ID
const GetBillbyID = async (req, res) => {
  try {
    const BillbyId = await BillModel.findById(req.params.id);
    res.status(200).json({
      message: "the bill found successfully",
      data: BillbyId,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Wipe a bill from the records
const DeleteBill = async (req, res) => {
  try {
    await BillModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "the bill removed successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// Pull all bills belonging to a specific user
const GetBillbyUserID = async (req, res) => {
  try {
    const BillbyUserID = await BillModel.find({
      userID: req.params.userId,
    }).populate("userID");

    res.status(200).json({
      message: "Bill Found Successfully",
      data: BillbyUserID,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  AddBill,
  GetAllBills,
  GetBillbyID,
  DeleteBill,
  GetBillbyUserID,
};

