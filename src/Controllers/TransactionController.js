const TransactionModel = require("../models/TransactionModel")
const AddTransaction = async (req,res) =>{
    try{ 
         const AddeTransaction = await TransactionModel.create(req.body);
         res.status(201).json({
         message:"the Transaction is added successfully",
         data:AddeTransaction
})
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
const GetAlltransaction = async (req,res) =>{
    try{
        const AllTransaction = await TransactionModel.find()
        res.status(200).json({
            message:"the Transactions fetched successfully",
            data:AllTransaction
        })

    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}
const GettransactionbyID = async (req,res) =>{
    try{
      const TransactionbyID = await TransactionModel.findById(req.params.id)
      res.status(200).json({
        message:"the transaction found successfully",
        data:TransactionbyID
      })
    }catch(err){
      res.status(404).json({
        message:err.message
      })
    }
}
const DeleteTransaction = async (req,res) =>{
    try{
       const DeletedTransaction = await TransactionModel.findByIdAndDelete(req.params.id)
       res.status(200).json({
        message:"the transaction deleted successfully"
       })
    }catch(err){ 
        res.status(404).json({
            message:err.message
        })

    }
}
module.exports = {
    AddTransaction,GetAlltransaction,GettransactionbyID,DeleteTransaction
}