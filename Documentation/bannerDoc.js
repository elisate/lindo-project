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
 *           description: Auto-generated MongoDB ID of the banner.
 *         title:
 *           type: string
 *           description: Title of the banner.
 *         subTitle:
 *           type: string
 *           description: Optional subtitle for the banner.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs stored on Cloudinary.
 *         category:
 *           type: string
 *           description: ID of the linked category.
 *         isActive:
 *           type: boolean
 *           description: Whether the banner is active.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the banner was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the banner was last updated.
 *       example:
 *         _id: "60f6b5c4f1a4f72a4c8b4567"
 *         title: "Summer Sale Banner"
 *         subTitle: "Up to 50% Off"
 *         images:
 *           - "https://res.cloudinary.com/demo/image/upload/v123456789/sample.jpg"
 *         category: "60f6b5a8f1a4f72a4c8b4566"
 *         isActive: true
 *         createdAt: "2024-07-08T08:30:00Z"
 *         updatedAt: "2024-07-08T08:30:00Z"
 */

/**
 * @swagger
 * /banner/createBanner:
 *   post:
 *     summary: Create a new banner.
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title for the banner.
 *               subTitle:
 *                 type: string
 *                 description: Optional subtitle for the banner.
 *               categoryId:
 *                 type: string
 *                 description: ID of the category to link the banner to.
 *               images:
 *                 type: array
 *                 description: One or more images to upload.
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Banner created successfully.
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
 *         description: Bad request or validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /banner/{bannerId}/products:
 *   get:
 *     summary: Get all products linked to the banner's category.
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the banner.
 *     responses:
 *       200:
 *         description: List of products for the banner's linked category.
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
 *                     subTitle:
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
 *                     description: A product in the category.
 *       400:
 *         description: Invalid banner ID.
 *       404:
 *         description: Banner not found.
 *       500:
 *         description: Internal server error.
 */
