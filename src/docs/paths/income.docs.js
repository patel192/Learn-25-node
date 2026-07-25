/**
 * @openapi
 * tags:
 *   - name: Income
 *     description: Income Management APIs
 */

/**
 * @openapi
 * /api/income:
 *   post:
 *     tags:
 *       - Income
 *     summary: Create income
 *     description: Creates a new income entry for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIncomeRequest'
 *     responses:
 *       201:
 *         description: Income added successfully.
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
 *                   example: Income added successfully
 *                 data:
 *                   $ref: '#/components/schemas/Income'
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/incomes:
 *   get:
 *     tags:
 *       - Income
 *     summary: Get all income
 *     description: Returns every income record. Admin only.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Income fetched successfully.
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
 *                     $ref: '#/components/schemas/Income'
 *
 *       403:
 *         description: Forbidden
 */

/**
 * @openapi
 * /api/incomes/me:
 *   get:
 *     tags:
 *       - Income
 *     summary: Get logged-in user's income
 *     description: Returns all income entries belonging to the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Income found successfully.
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
 *                     $ref: '#/components/schemas/Income'
 */

/**
 * @openapi
 * /api/income/{id}:
 *   get:
 *     tags:
 *       - Income
 *     summary: Get income by ID
 *     description: Returns a single income belonging to the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Income found successfully.
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
 *                   $ref: '#/components/schemas/Income'
 *
 *       403:
 *         description: Forbidden
 *
 *       404:
 *         description: Income not found
 *
 *   delete:
 *     tags:
 *       - Income
 *     summary: Delete income
 *     description: Deletes an income entry owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Income deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Income deleted successfully
 *
 *       403:
 *         description: Forbidden
 *
 *       404:
 *         description: Income not found
 */