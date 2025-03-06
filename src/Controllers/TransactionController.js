const TransactionModel = require("../models/transactionModel")
const addTransaction = async (req,res) =>{
    try{
       const addedTrasaction = await TransactionModel.create(req.body)
       res.status(201).json({
        message:"the trasaction added succesfully",
        data:addedTrasaction
       })
    }catch(err){
      res.status(500).json({
        message:err.message
      })
    }
}
const getTransactions = async (req,res)=>{
    try{
       const Alltransactions = await TransactionModel.find().populate("userID")
       res.status(200).json({
        message:"the trasaction history fethed successfully",
        data:Alltransactions
       })
    }catch{
       res.status(404).json({
        message:err.message
       })
    }
}

const getTransactionById = async (req,res) =>{
    try{
       const TransactionById = await TransactionModel.findById(req.params.id);
       res.status(200).json({
        message:"the transaction found successfully",
        data:TransactionById
       })
    }catch(err){
       res.status(404).json({
        message:err.message
       })
    }
}
module.exports = {
    addTransaction,
    getTransactions,
    getTransactionById
}