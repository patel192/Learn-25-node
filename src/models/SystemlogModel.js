const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SystemLogSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("SystemLog", SystemLogSchema);
