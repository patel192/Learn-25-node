const BillModel = require("../models/BillModel");
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
const DeleteBill = async (req, res) => {
  try {
    const DeletedBill = await BillModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "the bill removed successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
const GetBillbyUserID = async (req, res) => {
  try {
    const BillbyUserID = await BudgetModel.find({
      userID: req.params.id,
    }).populate("userID");
    if (BillbyUserID.length === 0) {
      res.status(404).json({
        message: "No Bills Found",
      });
    } else {
      res.status(200).json({
        message: "Bill Found Successfully",
        data: BillbyUserID,
      });
    }
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
