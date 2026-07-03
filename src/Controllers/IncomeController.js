const IncomeModel = require("../models/IncomeModel");
const AddIncome = async (req, res) => {
  const incomeData = {...req.body,userID:req.user.id};
  try {
    const AddedIncome = await IncomeModel.create(incomeData);
    res.status(201).json({
      message: "the income is added successfully",
      data: AddedIncome,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const GetAllincome = async (req, res) => {
  try {
    const Allincome = await IncomeModel.find();
    res.status(200).json({
      message: "the income found successfully",
      data: Allincome,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const GetIncomebyID = async (req, res) => {
  try {
    const IncomebyID = await IncomeModel.findById(req.params.id);
    if(!IncomebyID){
      return res.status(404).json({
        message:"Income not found"
      });
    }
    if(IncomebyID.userID.toString() !== req.user.id && req.user.role !== "Admin"){
      return res.status(403).json({
        message:"Forbidden"
      });
    }
    res.status(200).json({
      message: "the income found successfully",
      data: IncomebyID,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const DeleteIncome = async (req, res) => {
  try {
    const income = await IncomeModel.findById(req.params.id);
    if(!income){
      return res.status(404).json({
        message:"Income not found"
      });
    }
    if(income.userID.toString() !== req.user.id){
      return res.status(403).json({
        message:"Forbidden"
      });
    }
    await IncomeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "the income deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const GetIncomebyUserID = async (req, res) => {
  try {
    const userId = req.user.id;
    const IncomebyUserID = await IncomeModel.find({
      userID:userId,
    })

    if (IncomebyUserID.length === 0) {
      res.status(404).json({
        message: "No Income Found",
      });
    } else {
      res.status(200).json({
        message: "Income Found Successfully",
        data: IncomebyUserID,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  AddIncome,
  GetAllincome,
  GetIncomebyID,
  DeleteIncome,
  GetIncomebyUserID,
};

