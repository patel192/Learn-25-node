module.exports = {
  Bill: {
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
      name: {
        type: "string",
        example: "Electricity Bill",
      },
      dueDate: {
        type: "string",
        format: "date",
        example: "2026-07-31",
      },
      amount: {
        type: "number",
        example: 2500,
      },
      status: {
        type: "string",
        enum: ["pending", "paid"],
        example: "pending",
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

  CreateBillRequest: {
    type: "object",
    required: [
      "name",
      "dueDate",
      "amount"
    ],
    properties: {
      name: {
        type: "string",
        example: "Electricity Bill",
      },
      dueDate: {
        type: "string",
        format: "date",
        example: "2026-07-31",
      },
      amount: {
        type: "number",
        example: 2500,
      },
      status: {
        type: "string",
        enum: ["pending", "paid"],
        example: "pending",
      },
    },
  },
};