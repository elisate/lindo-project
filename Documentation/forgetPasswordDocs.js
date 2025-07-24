/**
 * @swagger
 * tags:
 *   name: Password Reset
 *   description: Endpoints for requesting and resetting passwords
 */

/**
 * @swagger
 * /reset/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset link sent to your email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reset link sent to your email.
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /reset/reset-password/{token}:
 *   post:
 *     summary: Reset password using token
 *     tags: [Password Reset]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token received in email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: StrongNewPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Error resetting password
 */
