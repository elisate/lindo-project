/**
 * @swagger
 * tags:
 *   - name: Banners
 *     description: Banner management and linked products.
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
 *           description: Auto-generated MongoDB ID.
 *         title:
 *           type: string
 *           description: Banner title.
 *         subTitle:
 *           type: string
 *           description: Optional subtitle.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of Cloudinary image URLs.
 *         category:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             description:
 *               type: string
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: "60f6b5c4f1a4f72a4c8b4567"
 *         title: "Summer Sale Banner"
 *         subTitle: "Up to 50% Off"
 *         images:
 *           - "https://res.cloudinary.com/demo/image/upload/sample.jpg"
 *         category:
 *           _id: "60f6b5a8f1a4f72a4c8b4566"
 *           name: "Clothing"
 *           description: "Seasonal clothes"
 *         isActive: true
 *         createdAt: "2024-07-08T08:30:00Z"
 *         updatedAt: "2024-07-08T08:30:00Z"
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
 *               subTitle:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               images:
 *                 type: array
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
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /banner/{bannerId}/products:
 *   get:
 *     summary: Get products linked to a banner's category.
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Banner ID.
 *     responses:
 *       200:
 *         description: Products linked to the banner's category.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 banner:
 *                   $ref: '#/components/schemas/Banner'
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid banner ID.
 *       404:
 *         description: Banner not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /banner/getAllBanners:
 *   get:
 *     summary: Get all banners.
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: List of all banners.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 banners:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Banner'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /banner/getBannerById/{bannerId}:
 *   get:
 *     summary: Get a banner by ID.
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Banner ID.
 *     responses:
 *       200:
 *         description: Banner found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 banner:
 *                   $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Banner not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /banner/updateBanner/{bannerId}:
 *   put:
 *     summary: Update a banner.
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Banner ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subTitle:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Banner updated successfully.
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
 *         description: Invalid ID.
 *       404:
 *         description: Banner not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /banner/deleteBanner/{bannerId}:
 *   delete:
 *     summary: Delete a banner.
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Banner ID.
 *     responses:
 *       200:
 *         description: Banner deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Banner not found.
 *       500:
 *         description: Internal server error.
 */
