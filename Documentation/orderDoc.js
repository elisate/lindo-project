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
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, card, mobile]
 *                 example: cash
 *               shippingAddress:
 *                 type: string
 *                 example: Kigali, Rwanda
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
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cart is empty or invalid
 *       500:
 *         description: Internal server error
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
 *                 message:
 *                   type: string
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Failed to retrieve orders
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
 *                 message:
 *                   type: string
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           example: 64a21f1b2fd01a3ef2a21aab
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           format: float
 *           example: 49.99
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalAmount:
 *           type: number
 *           example: 99.98
 *         status:
 *           type: string
 *           enum: [pending, paid, shipped, delivered, cancelled]
 *           example: pending
 *         paymentMethod:
 *           type: string
 *           enum: [cash, card, mobile]
 *           example: cash
 *         shippingAddress:
 *           type: string
 *           example: Kigali, Rwanda
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
