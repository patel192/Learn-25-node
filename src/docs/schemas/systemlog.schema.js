module.exports = {
  SystemLog: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad123",
      },
      user: {
        type: "string",
        example: "68824e0c9b5f3dbfd03ad456",
      },
      action: {
        type: "string",
        example: "CREATE_EXPENSE",
      },
      description: {
        type: "string",
        example: "User created a new expense.",
      },
      timestamp: {
        type: "string",
        format: "date-time",
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

  CreateSystemLogRequest: {
    type: "object",
    required: ["action"],
    properties: {
      action: {
        type: "string",
        example: "LOGIN",
      },
      description: {
        type: "string",
        example: "User logged into the application.",
      },
    },
  },
};