const RecurringModel = require("../models/RecurringModel");
const createRecurring = async (req,res) => {
    try{
     const recurring = await RecurringModel.create(req.body);
     res.status(201).json({
        message:"Recurring transaction created",
        data:recurring
     });
    }catch(err){
       res.status(500).json({
        message:"Error creating recurring transaction",
        error:err.message
       });
    }
}


const getRecurringByUser = async (req,res) => {
    try{ 
     const recurring = await RecurringModel.find({
        userId:req.params.userId,
     });
     res.status(200).json({
        data:recurring
     })
    }catch(err){
     res.status(500).json({
        message:"Error fetching recurring transactions",
     });
    }
}

module.exports = {
    createRecurring,getRecurringByUser
}