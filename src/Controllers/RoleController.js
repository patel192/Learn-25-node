// const roleModel = require("../models/RoleModel")
// //roleModel == roles
// const getAllRoles = async (req, res) => {
//   //await....
//   //select * from roleModel

//   const roles = await roleModel.find() //[{}]

//   res.json({
//     message: "role fetched successfully",
//     data:roles
//   });
// };
// const addRole = async (req,res) =>{
//   const savedRole = await roleModel.create(req.body)
//   res.json({
//     message:"role created...",
//     data:savedRole

//   })
//   }

// const deleteRole = async (req,res)=>{
//   const deletdRole = await roleModel.findByIdAndDelete(req.params.id)
   
//   res.json({
//     message:"ROLE DELETED SUCCESSFULLY",
//     data:deletdRole
//   })
// }
// const findRole = async (req,res) => {

//   const fetchrole = await roleModel.findById(req.params.id)

//   res.json({
//     message:"role fetched",
//     data:fetchrole

//   })
// }

// module.exports = {
//     getAllRoles,addRole,deleteRole,findRole
// }