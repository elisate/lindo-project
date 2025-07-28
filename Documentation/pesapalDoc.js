/**
 * @swagger
 * tags:
 *   - name: Pesapal
 *     description: Pesapal payment integration endpoints
 *
 * /api/pesapal/initialize:
 *   post:
 *     tags:
 *       - Pesapal
 *     summary: Initialize Pesapal Payment
 *     description: Submit a payment order to Pesapal and get redirect URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderID
 *               - amount
 *               - currency
 *               - phone
 *               - email
 *               - firstName
 *               - lastName
 *             properties:
 *               orderID:
 *                 type: string
 *                 example: "64e6f2a41b2e4e6f9f5d7c8a"
 *               amount:
 *                 type: number
 *                 example: 1000
 *               currency:
 *                 type: string
 *                 example: "KES"
 *               phone:
 *                 type: string
 *                 example: "+254712345678"
 *               email:
 *                 type: string
 *                 example: "customer@example.com"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *     responses:
 *       200:
 *         description: Payment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment initiated successfully"
 *                 redirectUrl:
 *                   type: string
 *                   example: "https://pesapal.com/redirect/payment-url"
 *                 orderTrackingId:
 *                   type: string
 *                   example: "ABC123456789"
 *       400:
 *         description: Missing required payment fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required payment fields"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Internal server error or failed to initiate payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to initiate payment"
 *                 error:
 *                   type: string
 *
 * /api/pesapal/callback:
 *   get:
 *     tags:
 *       - Pesapal
 *     summary: Pesapal payment callback endpoint
 *     description: Pesapal calls this endpoint to notify about payment status.
 *     parameters:
 *       - in: query
 *         name: pesapal_merchant_reference
 *         schema:
 *           type: string
 *         required: true
 *         description: Merchant reference sent to Pesapal
 *       - in: query
 *         name: pesapal_transaction_tracking_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Pesapal transaction tracking id
 *       - in: query
 *         name: pesapal_payment_status_description
 *         schema:
 *           type: string
 *           enum: [PENDING, COMPLETED, FAILED, CANCELLED]
 *         required: false
 *         description: Payment status description from Pesapal
 *     responses:
 *       302:
 *         description: Redirect to frontend payment status page
 *       400:
 *         description: Missing merchant reference
 *       404:
 *         description: Order not found
 *       500:
 *         description: Pesapal callback failed
 *
 * /api/pesapal/ipn:
 *   post:
 *     tags:
 *       - Pesapal
 *     summary: Handle Pesapal Instant Payment Notification (IPN)
 *     description: Pesapal posts payment status updates here.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pesapal_merchant_reference
 *               - pesapal_transaction_tracking_id
 *               - pesapal_payment_status_description
 *             properties:
 *               pesapal_merchant_reference:
 *                 type: string
 *                 example: "XYZ987654321"
 *               pesapal_transaction_tracking_id:
 *                 type: string
 *                 example: "ABC123456789"
 *               pesapal_payment_status_description:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, FAILED, CANCELLED]
 *                 example: "COMPLETED"
 *     responses:
 *       200:
 *         description: IPN processed successfully
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
 *                   example: "IPN processed."
 *       400:
 *         description: Missing merchant reference
 *       404:
 *         description: Order not found
 *       500:
 *         description: IPN handler failed
 */
