/**
 * @swagger
 * tags:
 *   name: DPO Payments
 *   description: Endpoints for initiating and verifying DPO payments
 */

/**
 * @swagger
 * /dpo/initialize/dpoPayment:
 *   post:
 *     summary: Initialize a DPO payment
 *     tags: [DPO Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - totalAmount
 *               - email
 *               - phone
 *               - firstName
 *             properties:
 *               totalAmount:
 *                 type: number
 *                 example: 10000
 *               currency:
 *                 type: string
 *                 example: RWF
 *               email:
 *                 type: string
 *                 example: elisa@example.com
 *               phone:
 *                 type: string
 *                 example: "+250788123456"
 *               firstName:
 *                 type: string
 *                 example: DUSHIMIYIMANA
 *               lastName:
 *                 type: string
 *                 example: Elisa
 *               serviceDescription:
 *                 type: string
 *                 example: Payment for online service
 *               callbackUrl:
 *                 type: string
 *                 example: https://lindocae-frontend.vercel.app/payment/success
 *     responses:
 *       200:
 *         description: Payment token created and redirect URL returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 redirectUrl:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /dpo/verify/dpoPayment:
 *   post:
 *     summary: Verify DPO payment using token
 *     tags: [DPO Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: 123456abcdef
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 details:
 *                   type: object
 *       400:
 *         description: Missing or invalid token
 *       500:
 *         description: Server error
 */
