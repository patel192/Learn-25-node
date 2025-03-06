const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);
