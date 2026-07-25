/**
 * @openapi
 * tags:
 *   - name: System Logs
 *     description: System activity log APIs
 */

/**
 * @openapi
 * /api/logs:
 *   post:
 *     tags:
 *       - System Logs
 *     summary: Create a system log
 *     description: Creates a new system log entry for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSystemLogRequest'
 *
 *     responses:
 *       201:
 *         description: Log entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Log entry created
 *                 log:
 *                   $ref: '#/components/schemas/SystemLog'
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/logs:
 *   get:
 *     tags:
 *       - System Logs
 *     summary: Get all system logs
 *     description: Returns all system log entries. Admin only.
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Logs fetched successfully.
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
 *                   example: Logs fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SystemLog'
 *
 *       403:
 *         description: Forbidden
 *
 *       500:
 *         description: Internal Server Error
 */