/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Manage user wishlist actions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the wishlist.
 *         user:
 *           type: string
 *           description: ID of the user who owns the wishlist.
 *         products:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of product IDs in the wishlist.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Wishlist creation timestamp.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp.
 *       example:
 *         _id: "60f6b5c4f1a4f72a4c8b4567"
 *         user: "60f6b5c4f1a4f72a4c8b4566"
 *         products:
 *           - "60f6b5c4f1a4f72a4c8b1234"
 *           - "60f6b5c4f1a4f72a4c8b5678"
 *         createdAt: "2024-07-10T08:00:00Z"
 *         updatedAt: "2024-07-10T08:05:00Z"
 */

/**
 * @swagger
 * /wishlist/toggleWishlistProduct:
 *   post:
 *     summary: Add or remove a product from the user's wishlist.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add or remove.
 *             example:
 *               productId: "60f6b5c4f1a4f72a4c8b1234"
 *     responses:
 *       200:
 *         description: Product added or removed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 wishlist:
 *                   $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /wishlist/getUserWishlistProducts/{userId}:
 *   get:
 *     summary: Get all product details in the wishlist for a specific user.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose wishlist you want to fetch.
 *     responses:
 *       200:
 *         description: List of wishlist products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Product details.
 *       400:
 *         description: Bad request (missing user ID).
 *       500:
 *         description: Internal server error.
 */
