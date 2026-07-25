const swaggerJsdoc = require("swagger-jsdoc");
const commonSchemas = require("./schemas/common.schema");
const userSchemas = require("./schemas/user.schema");
const expenseSchemas = require("./schemas/expense.schema");
const incomeSchemas = require("./schemas/income.schema");
const categorySchemas = require("./schemas/category.schema");
const budgetSchemas = require("./schemas/budget.schema");
const billSchemas = require("./schemas/bill.schema");
const reportSchemas = require("./schemas/report.schema");
const transactionSchemas = require("./schemas/transaction.schema");
const aiSchemas = require("./schemas/ai.schema");
const systemLogSchemas = require("./schemas/systemlog.schema");

const options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Expense Manager API",
      version: "1.0.0",
      description:
        "REST API for Expense Manager with AI-powered financial insights.",
    },

    servers: [
      {
        url: "http://localhost:3001",
        description: "Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...commonSchemas,
        ...userSchemas,
        ...expenseSchemas,
        ...incomeSchemas,
        ...categorySchemas,
        ...budgetSchemas,
        ...billSchemas,
        ...reportSchemas,
        ...transactionSchemas,
        ...aiSchemas,
        ...systemLogSchemas,
      },
    },
  },

  apis: ["./src/docs/paths/*.js"],
};

module.exports = swaggerJsdoc(options);
