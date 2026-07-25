/**
 * @openapi
 * tags:
 *   - name: Budgets
 *     description: Budget Management APIs
 */

/**
 * @openapi
 * /api/budget:
 *   post:
 *     tags:
 *       - Budgets
 *     summary: Create budget
 *     description: Creates a new budget for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBudgetRequest'
 *
 *     responses:
 *       201:
 *         description: Budget added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Budget added successfully
 *                 data:
 *                   $ref: '#/components/schemas/Budget'
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/budgets:
 *   get:
 *     tags:
 *       - Budgets
 *     summary: Get all budgets
 *     description: Returns every budget. Admin only.
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Budgets fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Budget'
 *
 *       403:
 *         description: Forbidden
 */

/**
 * @openapi
 * /api/budgets/me:
 *   get:
 *     tags:
 *       - Budgets
 *     summary: Get logged-in user's budgets
 *     description: Returns all budgets belonging to the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Budget found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Budget'
 */

/**
 * @openapi
 * /api/budget/{id}:
 *   get:
 *     tags:
 *       - Budgets
 *     summary: Get budget by ID
 *     description: Returns a single budget owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *
 *     responses:
 *       200:
 *         description: Budget found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Budget'
 *
 *       403:
 *         description: Forbidden
 *
 *       404:
 *         description: Budget not found
 *
 *   delete:
 *     tags:
 *       - Budgets
 *     summary: Delete budget
 *     description: Deletes a budget owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *
 *     responses:
 *       200:
 *         description: Budget deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Budget deleted successfully
 *
 *       403:
 *         description: Forbidden
 *
 *       404:
 *         description: Budget not found
 */