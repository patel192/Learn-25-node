module.exports = {
  Income: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad123",
      },
      title: {
        type: "string",
        example: "Monthly Salary",
      },
      amount: {
        type: "number",
        example: 45000,
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

  CreateIncomeRequest: {
    type: "object",
    required: ["title", "amount", "categoryID", "date"],
    properties: {
      title: {
        type: "string",
        example: "Monthly Salary",
      },
      amount: {
        type: "number",
        example: 45000,
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
};