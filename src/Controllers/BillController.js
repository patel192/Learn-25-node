const BillModel = require("../models/BillModel");
const AddBill = async (req, res) => {
  try {
    const billData = {...req.body,userID:req.user.id};
    const AddedBill = await BillModel.create(billData);
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
    if(!BillbyId){
      return res.status(404).json({
        message:"Bill not found"
      });
    }
    if(BillbyId.userID.toString() !== req.user.id){
      return res.status(403).json({
        message:"Forbidden"
      });
    }
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
    const bill = await BillModel.findById(req.params.id);
    if(!bill){
      return res.status(404).json({
        message:"Bill not found"
      });
    }
    if(bill.userID.toString() !== req.user.id){
      return res.status(403).json({
        message:"Forbidden"
      });
    }

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

const GetBillbyUserID = async (req, res) => {
  try {
    const userId = req.user.id;
    const BillbyUserID = await BillModel.find({
      userID: userId,
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

