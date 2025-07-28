/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order management endpoints
 */

/**
 * @swagger
 * /orders/createOrder:
 *   post:
 *     summary: Create a new order from the user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMethod
 *               - shippingAddress
 *               - customerEmail
 *               - customerPhone
 *               - customerName
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, card, mobile, pesapal]
 *                 example: pesapal
 *               shippingAddress:
 *                 type: string
 *                 example: "Kigali, Rwanda"
 *               customerEmail:
 *                 type: string
 *                 format: email
 *                 example: "customer@example.com"
 *               customerPhone:
 *                 type: string
 *                 example: "+250788123456"
 *               customerName:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order created successfully."
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *                 redirectUrl:
 *                   type: string
 *                   nullable: true
 *                   description: "Redirect URL for payment if using Pesapal"
 *                   example: "https://pesapal.com/redirect/payment-url"
 *       400:
 *         description: Cart is empty or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart is empty."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

/**
 * @swagger
 * /orders/myOrders:
 *   get:
 *     summary: Get current user's order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Failed to retrieve orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Could not retrieve orders."
 */

/**
 * @swagger
 * /orders/allOrders:
 *   get:
 *     summary: Admin - Get all orders in the system
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to get all orders."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *         - price
 *       properties:
 *         productId:
 *           type: string
 *           description: The unique ID of the product
 *           example: "64a21f1b2fd01a3ef2a21aab"
 *         quantity:
 *           type: integer
 *           description: Quantity ordered
 *           example: 2
 *         price:
 *           type: number
 *           format: float
 *           description: Price per item
 *           example: 49.99
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Order unique ID
 *           example: "64a9f3e26d0c6b1d88712345"
 *         userId:
 *           type: string
 *           description: User who placed the order
 *           example: "64a21f1b2fd01a3ef2a21aac"
 *         items:
 *           type: array
 *           description: List of products in the order
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalAmount:
 *           type: number
 *           format: float
 *           example: 99.98
 *         status:
 *           type: string
 *           enum: [pending, paid, shipped, delivered, cancelled]
 *           example: pending
 *         paymentMethod:
 *           type: string
 *           enum: [cash, card, mobile, pesapal]
 *           example: pesapal
 *         shippingAddress:
 *           type: string
 *           example: "Kigali, Rwanda"
 *         customerEmail:
 *           type: string
 *           format: email
 *           example: "customer@example.com"
 *         customerPhone:
 *           type: string
 *           example: "+250788123456"
 *         customerName:
 *           type: string
 *           example: "John Doe"
 *         pesapalOrderTrackingId:
 *           type: string
 *           nullable: true
 *           example: "ABC123456789"
 *         pesapalMerchantRequestId:
 *           type: string
 *           nullable: true
 *           example: "XYZ987654321"
 *         pesapalRedirectUrl:
 *           type: string
 *           nullable: true
 *           example: "https://pesapal.com/redirect/payment-url"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-28T15:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-28T15:30:00.000Z"
 */
