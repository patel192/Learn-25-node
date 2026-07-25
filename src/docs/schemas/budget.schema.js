module.exports = {
  Budget: {
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
      categoryID: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad789",
      },
      amount: {
        type: "number",
        example: 10000,
      },
      start_date: {
        type: "string",
        format: "date",
        example: "2026-07-01",
      },
      end_date: {
        type: "string",
        format: "date",
        example: "2026-07-31",
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

  CreateBudgetRequest: {
    type: "object",
    required: [
      "categoryID",
      "amount",
      "start_date",
      "end_date",
    ],
    properties: {
      categoryID: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad789",
      },
      amount: {
        type: "number",
        example: 10000,
      },
      start_date: {
        type: "string",
        format: "date",
        example: "2026-07-01",
      },
      end_date: {
        type: "string",
        format: "date",
        example: "2026-07-31",
      },
    },
  },
};