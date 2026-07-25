/**
 * @openapi
 * tags:
 *   - name: Bills
 *     description: Bill Management APIs
 */

/**
 * @openapi
 * /api/bill:
 *   post:
 *     tags:
 *       - Bills
 *     summary: Create bill
 *     description: Creates a new bill for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBillRequest'
 *
 *     responses:
 *       201:
 *         description: Bill added successfully.
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
 *                   example: Bill added successfully
 *                 data:
 *                   $ref: '#/components/schemas/Bill'
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/bills:
 *   get:
 *     tags:
 *       - Bills
 *     summary: Get all bills
 *     description: Returns all bills. Admin only.
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Bills fetched successfully.
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
 *                     $ref: '#/components/schemas/Bill'
 *
 *       403:
 *         description: Forbidden
 */

/**
 * @openapi
 * /api/bills/me:
 *   get:
 *     tags:
 *       - Bills
 *     summary: Get logged-in user's bills
 *     description: Returns all bills belonging to the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Bills found successfully.
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
 *                     $ref: '#/components/schemas/Bill'
 */

/**
 * @openapi
 * /api/bill/{id}:
 *   get:
 *     tags:
 *       - Bills
 *     summary: Get bill by ID
 *     description: Returns a single bill owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bill ID
 *
 *     responses:
 *       200:
 *         description: Bill found successfully.
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
 *                   $ref: '#/components/schemas/Bill'
 *
 *       403:
 *         description: Forbidden
 *
 *       404:
 *         description: Bill not found
 *
 *   delete:
 *     tags:
 *       - Bills
 *     summary: Delete bill
 *     description: Deletes a bill owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bill ID
 *
 *     responses:
 *       200:
 *         description: Bill deleted successfully.
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
 *                   example: Bill deleted successfully
 *
 *       403:
 *         description: Forbidden
 *
 *       404:
 *         description: Bill not found
 */