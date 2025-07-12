/**
 * @swagger
 * tags:
 *   name: Ads
 *   description: API for managing Ads
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ad:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - buttonLabel
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the Ad
 *         title:
 *           type: string
 *           description: The ad title
 *         content:
 *           type: string
 *           description: The main content
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         buttonLabel:
 *           type: string
 *           description: The label for a CTA button
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /adds/createAd:
 *   post:
 *     summary: Create a new Ad
 *     tags: [Ads]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               buttonLabel:
 *                 type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: The created Ad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       400:
 *         description: Bad request (missing image or fields)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /adds/getAds:
 *   get:
 *     summary: Get all Ads
 *     tags: [Ads]
 *     responses:
 *       200:
 *         description: List of all Ads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ad'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /adds/getAdById/{id}:
 *   get:
 *     summary: Get an Ad by ID
 *     tags: [Ads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Ad
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Ad data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       404:
 *         description: Ad not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /adds/updateAd/{id}:
 *   put:
 *     summary: Update an Ad by ID
 *     tags: [Ads]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Ad
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               buttonLabel:
 *                 type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Updated Ad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       404:
 *         description: Ad not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /adds/deleteAd/{id}:
 *   delete:
 *     summary: Delete an Ad by ID
 *     tags: [Ads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Ad
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ad deleted successfully
 *       404:
 *         description: Ad not found
 *       500:
 *         description: Internal server error
 */
