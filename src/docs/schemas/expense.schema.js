module.exports = {
  Expense: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad123",
      },
      title: {
        type: "string",
        example: "Grocery Shopping",
      },
      amount: {
        type: "number",
        example: 850,
      },
      categoryID: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad456",
      },
      userID: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad789",
      },
      date: {
        type: "string",
        format: "date",
        example: "2026-07-25",
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

  CreateExpenseRequest: {
    type: "object",
    required: ["title", "amount", "categoryID", "date"],
    properties: {
      title: {
        type: "string",
        example: "Grocery Shopping",
      },
      amount: {
        type: "number",
        example: 850,
      },
      categoryID: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad456",
      },
      date: {
        type: "string",
        format: "date",
        example: "2026-07-25",
      },
    },
  },

  UpdateExpenseRequest: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "Monthly Grocery",
      },
      amount: {
        type: "number",
        example: 950,
      },
      categoryID: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad456",
      },
      date: {
        type: "string",
        format: "date",
        example: "2026-07-26",
      },
    },
  },
};