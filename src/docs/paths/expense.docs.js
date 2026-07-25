/**
 * @openapi
 * tags:
 *   - name: Expenses
 *     description: Expense Management APIs
 */

/**
 * @openapi
 * /api/expense:
 *   post:
 *     tags:
 *       - Expenses
 *     summary: Create a new expense
 *     description: Creates a new expense for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExpenseRequest'
 *
 *     responses:
 *       201:
 *         description: Expense created successfully.
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
 *                   example: Expense Added successfully
 *                 data:
 *                   $ref: '#/components/schemas/Expense'
 *
 *       400:
 *         description: Validation Error
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/expenses:
 *   get:
 *     tags:
 *       - Expenses
 *     summary: Get all expenses
 *     description: Returns all expenses. Accessible only by Admin users.
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Expenses fetched successfully.
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
 *                   example: Expenses fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Expense'
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/expenses/me:
 *   get:
 *     tags:
 *       - Expenses
 *     summary: Get logged-in user's expenses
 *     description: Returns all expenses belonging to the authenticated user with optional filters.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter expenses from this date.
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter expenses until this date.
 *
 *       - in: query
 *         name: categoryID
 *         schema:
 *           type: string
 *         description: Category ID.
 *
 *       - in: query
 *         name: minAmount
 *         schema:
 *           type: number
 *         description: Minimum expense amount.
 *
 *       - in: query
 *         name: maxAmount
 *         schema:
 *           type: number
 *         description: Maximum expense amount.
 *
 *     responses:
 *       200:
 *         description: Expense found successfully.
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
 *                   example: Expense found successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Expense'
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/expenses/recent:
 *   get:
 *     tags:
 *       - Expenses
 *     summary: Get recent expenses
 *     description: Returns the five most recent expenses of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Recent expenses fetched successfully.
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
 *                   example: Recent expenses fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Expense'
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/expense/{id}:
 *   get:
 *     tags:
 *       - Expenses
 *     summary: Get expense by ID
 *     description: Returns a single expense belonging to the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *
 *     responses:
 *       200:
 *         description: Expense fetched successfully.
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
 *                   example: Expense fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Expense'
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden - You do not own this expense.
 *
 *       404:
 *         description: Expense not found
 *
 *       500:
 *         description: Internal Server Error
 *
 *   put:
 *     tags:
 *       - Expenses
 *     summary: Update expense
 *     description: Updates an existing expense owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExpenseRequest'
 *
 *     responses:
 *       200:
 *         description: Expense updated successfully.
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
 *                   example: Expense updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Expense'
 *
 *       400:
 *         description: Validation Error
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden - You do not own this expense.
 *
 *       404:
 *         description: Expense not found
 *
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     tags:
 *       - Expenses
 *     summary: Delete expense
 *     description: Deletes an expense owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *
 *     responses:
 *       200:
 *         description: Expense deleted successfully.
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
 *                   example: Expense Deleted Successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden - You do not own this expense.
 *
 *       404:
 *         description: Expense not found
 *
 *       500:
 *         description: Internal Server Error
 */