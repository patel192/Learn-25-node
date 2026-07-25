module.exports = {
  Category: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad123",
      },
      name: {
        type: "string",
        example: "Food",
      },
      type: {
        type: "string",
        example: "expense",
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

  CreateCategoryRequest: {
    type: "object",
    required: ["name", "type"],
    properties: {
      name: {
        type: "string",
        example: "Food",
      },
      type: {
        type: "string",
        example: "expense",
      },
    },
  },
};