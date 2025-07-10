/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Endpoints for managing product categories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID.
 *         name:
 *           type: string
 *           description: Name of the category.
 *         description:
 *           type: string
 *           description: Description of the category.
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs for the category.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the category was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the category was last updated.
 *       example:
 *         _id: "60f6b5c4f1a4f72a4c8b1234"
 *         name: "Electronics"
 *         description: "Products related to electronic devices."
 *         image:
 *           - "https://res.cloudinary.com/your-cloud/image/upload/sample1.jpg"
 *           - "https://res.cloudinary.com/your-cloud/image/upload/sample2.jpg"
 *         createdAt: "2024-07-10T08:00:00Z"
 *         updatedAt: "2024-07-10T08:05:00Z"
 */

/**
 * @swagger
 * /category/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category.
 *               description:
 *                 type: string
 *                 description: Description of the category.
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: One or more image files to upload.
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Category already exists or invalid input.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /category/getAllCategories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /category/getCategoryById/{id}:
 *   get:
 *     summary: Get a category by its ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the category.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /category/updateCategoryById/{id}:
 *   put:
 *     summary: Update a category by its ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the category.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name.
 *               description:
 *                 type: string
 *                 description: Updated description.
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: One or more new images.
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /category/deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category by its ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the category.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
