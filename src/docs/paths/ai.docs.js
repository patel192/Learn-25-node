/**
 * @openapi
 * tags:
 *   - name: AI
 *     description: AI-powered financial assistant APIs
 */

/**
 * @openapi
 * /api/ai/ask:
 *   post:
 *     tags:
 *       - AI
 *     summary: Ask the AI assistant
 *     description: Sends a financial question to the AI assistant.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AIChatRequest'
 *     responses:
 *       200:
 *         description: AI response generated successfully.
 */

/**
 * @openapi
 * /api/ai/expense-insights:
 *   get:
 *     tags:
 *       - AI
 *     summary: Get expense insights
 *     description: Generates AI-powered insights from the user's expense history.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expense insights generated successfully.
 */

/**
 * @openapi
 * /api/ai/budget-plan:
 *   get:
 *     tags:
 *       - AI
 *     summary: Generate budget plan
 *     description: Generates a personalized budget plan.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Budget plan generated successfully.
 */

/**
 * @openapi
 * /api/ai/spending-risk:
 *   get:
 *     tags:
 *       - AI
 *     summary: Detect spending risk
 *     description: Analyzes current spending patterns and identifies potential overspending risks.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Spending risk generated successfully.
 */

/**
 * @openapi
 * /api/ai/financial-forecast:
 *   get:
 *     tags:
 *       - AI
 *     summary: Financial forecast
 *     description: Predicts future financial trends based on historical data.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Financial forecast generated successfully.
 */

/**
 * @openapi
 * /api/ai/saving-opportunities:
 *   get:
 *     tags:
 *       - AI
 *     summary: Detect saving opportunities
 *     description: Finds areas where the user can reduce spending and save more.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saving opportunities generated successfully.
 */

/**
 * @openapi
 * /api/ai/financial-health:
 *   get:
 *     tags:
 *       - AI
 *     summary: Financial health score
 *     description: Calculates an overall financial health score for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Financial health score generated successfully.
 */

/**
 * @openapi
 * /api/ai/insights:
 *   get:
 *     tags:
 *       - AI
 *     summary: Get all AI insights
 *     description: Returns all AI-generated financial insights for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Insights fetched successfully.
 */