const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
    is_active:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("users", UserSchema);
