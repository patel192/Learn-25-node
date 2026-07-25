/**
 * @openapi
 * tags:
 *   - name: Reports
 *     description: Financial Report APIs
 */

/**
 * @openapi
 * /api/reports/me:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Generate financial report
 *     description: Generates and downloads a PDF financial report for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: PDF generated successfully.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal Server Error
 */