module.exports = {
  SignupRequest: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
        example: "Muhammad Patel",
      },
      email: {
        type: "string",
        format: "email",
        example: "patel@gmail.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "Password123",
      },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "patel@gmail.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "Password123",
      },
    },
  },

  User: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "6880aabbccddeeff00112233",
      },
      name: {
        type: "string",
        example: "Muhammad Patel",
      },
      email: {
        type: "string",
        example: "patel@gmail.com",
      },
      role: {
        type: "string",
        example: "User",
      },
      profilePic: {
        type: "string",
        example: "",
      },
      is_active: {
        type: "boolean",
        example: true,
      },
    },
  },
};