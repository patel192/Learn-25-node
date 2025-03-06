const ExpenseModel = require("../models/ExpenseModel");
const ExpenseController = require("../models/ExpenseModel");

const addExpense = async (req, res) => {
  try {
    const addedExpense = await ExpenseController.create(req.body);

    res.status(201).json({
      message: "the expense added successfully",
      data: addedExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find().populate("categoryID").populate("userID");
    res.status(200).json({
      message: "the expenses fetched successfully",
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


const deleteExpense = async (req,res) =>{
    const deletedExpense = await ExpenseModel.findByIdAndDelete(req.params.id);
    try{

        res.status(200).json({
            message:"the expense deleted suyccessfully",
        })
    }catch(err){
        res.status(404).json({
            message:err.message

        })
    }
}
module.exports = {
  addExpense,
  getExpense,
  deleteExpense
};
