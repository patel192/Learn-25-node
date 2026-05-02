const mongoose = require("mongoose");

/**
 * --- AI INSIGHT MODEL ---
 * Stores the results of AI analysis (spending risks, budget plans, etc.)
 */

const AllInsightSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String, // e.g., "expense-insights", "budget-plan"
      required: true,
    },
    content: {
      type: String, // The actual text or JSON string from AI
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("AllInsight", AllInsightSchema);