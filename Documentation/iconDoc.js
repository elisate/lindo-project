/**
 * @swagger
 * tags:
 *   name: Icons
 *   description: API for managing Icons and their Categories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Icon:
 *       type: object
 *       required:
 *         - title
 *         - image
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the Icon.
 *         title:
 *           type: string
 *           description: Title of the Icon.
 *         image:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *           description: Array of image URLs.
 *         categoryId:
 *           type: string
 *           description: The related Category ID.
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /icons/createIcon:
 *   post:
 *     summary: Create a new Icon
 *     tags: [Icons]
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
 *               categoryId:
 *                 type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Icon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Icon'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /icons/getIcons:
 *   get:
 *     summary: Get all Icons
 *     tags: [Icons]
 *     responses:
 *       200:
 *         description: A list of all Icons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Icon'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /icons/getIconById/{id}:
 *   get:
 *     summary: Get a single Icon by ID
 *     tags: [Icons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Icon ID
 *     responses:
 *       200:
 *         description: The Icon details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Icon'
 *       404:
 *         description: Icon not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /icons/updateIcon/{id}:
 *   put:
 *     summary: Update an Icon by ID
 *     tags: [Icons]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Icon ID
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
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Icon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Icon'
 *       404:
 *         description: Icon not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /icons/deleteIcon/{id}:
 *   delete:
 *     summary: Delete an Icon by ID
 *     tags: [Icons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Icon ID
 *     responses:
 *       200:
 *         description: Icon deleted successfully
 *       404:
 *         description: Icon not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /icons/getCategoryByIconId/{id}:
 *   get:
 *     summary: Get the Category related to a specific Icon
 *     tags: [Icons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Icon ID
 *     responses:
 *       200:
 *         description: The related Category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Icon or Category not found
 *       500:
 *         description: Internal server error
 */
