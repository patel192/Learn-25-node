module.exports = {
  Transaction: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad123",
      },
      userID: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad456",
      },
      type: {
        type: "string",
        enum: ["Income", "Expense"],
        example: "Expense",
      },
      amount: {
        type: "number",
        example: 1200,
      },
      date: {
        type: "string",
        format: "date",
        example: "2026-07-25",
      },
      description: {
        type: "string",
        example: "Dinner with friends",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateTransactionRequest: {
    type: "object",
    required: ["type", "amount"],
    properties: {
      type: {
        type: "string",
        enum: ["Income", "Expense"],
        example: "Expense",
      },
      amount: {
        type: "number",
        example: 1200,
      },
      date: {
        type: "string",
        format: "date",
        example: "2026-07-25",
      },
      description: {
        type: "string",
        example: "Dinner with friends",
      },
    },
  },
};