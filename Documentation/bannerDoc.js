/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Banner management and linked products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       required:
 *         - images
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the banner
 *         title:
 *           type: string
 *           description: The title of the banner
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         category:
 *           type: string
 *           description: The ID of the linked category
 *         isActive:
 *           type: boolean
 *           description: Whether the banner is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: "60f6b5c4f1a4f72a4c8b4567"
 *         title: "Summer Sale Banner"
 *         images: ["https://res.cloudinary.com/demo/image/upload/v123456789/sample.jpg"]
 *         category: "60f6b5a8f1a4f72a4c8b4566"
 *         isActive: true
 *         createdAt: "2024-07-08T08:30:00Z"
 *         updatedAt: "2024-07-08T08:30:00Z"
 */

/**
 * @swagger
 * /api/banner/createBanner:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               categoryId:
 *                 type: string
 *                 description: ID of the category to link to the banner
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: One or more images to upload
 *     responses:
 *       201:
 *         description: Banner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 banner:
 *                   $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Bad request or validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/banner/{bannerId}/products:
 *   get:
 *     summary: Get all products for a banner's category
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the banner
 *     responses:
 *       200:
 *         description: List of products for the banner's category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 banner:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Product object
 *       400:
 *         description: Invalid banner ID
 *       404:
 *         description: Banner not found
 *       500:
 *         description: Internal server error
 */

