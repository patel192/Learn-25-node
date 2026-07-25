module.exports = {
  AIChatRequest: {
    type: "object",
    required: ["message"],
    properties: {
      message: {
        type: "string",
        example: "How can I reduce my monthly expenses?",
      },
    },
  },

  AIReply: {
    type: "object",
    properties: {
      reply: {
        type: "string",
        example:
          "Based on your spending history, reducing restaurant expenses could save approximately 15% each month.",
      },
    },
  },

  ExpenseInsights: {
    type: "object",
    properties: {
      insights: {
        type: "string",
        example:
          "Your food expenses increased by 18% compared to last month.",
      },
    },
  },

  BudgetPlan: {
    type: "object",
    properties: {
      budgetPlan: {
        type: "string",
        example:
          "Allocate 50% to needs, 30% to wants, and 20% to savings.",
      },
    },
  },

  SpendingRisk: {
    type: "object",
    properties: {
      risk: {
        type: "string",
        example:
          "High risk of exceeding your entertainment budget this month.",
      },
    },
  },

  FinancialForecast: {
    type: "object",
    properties: {
      forecast: {
        type: "string",
        example:
          "At your current spending rate, your savings will grow by approximately 8% this quarter.",
      },
    },
  },

  SavingOpportunities: {
    type: "object",
    properties: {
      opportunities: {
        type: "string",
        example:
          "Switching to a lower-cost subscription plan could save you $20 per month.",
      },
    },
  },

  FinancialHealthScore: {
    type: "object",
    properties: {
      score: {
        type: "number",
        example: 84,
      },
      rating: {
        type: "string",
        example: "Excellent",
      },
    },
  },
};