const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SystemLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref:"users", // The user involved in the action
      required: true,
    },
    action: {
      type: String, // e.g., "LOGIN", "CREATE_EXPENSE"
      required: true,
    },
    description: {
      type: String, // Extra details about what happened
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

SystemLogSchema.index({
    createdAt: -1
});

SystemLogSchema.index({
    user: 1,
    createdAt: -1
});

module.exports = mongoose.model("SystemLog", SystemLogSchema);

