/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Endpoints for product management
 */

/**
 * @swagger
 * /product/createProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - name
 *               - price
 *               - category
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro Max
 *               description:
 *                 type: string
 *                 example: Latest Apple smartphone
 *               price:
 *                 type: number
 *                 example: 1299.99
 *               category:
 *                 type: string
 *               stockType:
 *                 type: string
 *                 enum: [in_store, virtual_stock]
 *               quantity:
 *                 type: integer
 *               shippingInfo:
 *                 type: object
 *                 properties:
 *                   provider:
 *                     type: string
 *                     example: DHL
 *                   estimatedDeliveryDays:
 *                     type: integer
 *                     example: 3
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /product/getAllProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *                   stockType:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   shippingInfo:
 *                     type: object
 *                     properties:
 *                       provider:
 *                         type: string
 *                       estimatedDeliveryDays:
 *                         type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * 
/**
 * @swagger
 * /product/updateProductById/{id}:
 *   put:
 *     summary: Update an existing product by ID, including optional new images
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
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
 *                 example: New Product Name
 *               description:
 *                 type: string
 *                 example: Updated product description
 *               price:
 *                 type: number
 *                 example: 49.99
 *               category:
 *                 type: string
 *                 example: 64b1234abcd5678ef90123gh
 *               stockType:
 *                 type: string
 *                 enum: [in_store, virtual_stock]
 *                 example: in_store
 *               quantity:
 *                 type: integer
 *                 example: 100
 *               shippingProvider:
 *                 type: string
 *                 example: DHL
 *               estimatedDeliveryDays:
 *                 type: integer
 *                 example: 5
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: One or more new product images
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /product/getProductsByCreationDate:
 *   get:
 *     summary: Get all products sorted by creation date
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order ('asc' for oldest first, 'desc' for newest first)
 *     responses:
 *       200:
 *         description: List of products sorted by creation date
 *       400:
 *         description: Invalid order value
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /product/getProductsByCategory/{categoryId}:
 *   get:
 *     summary: Get all products by category ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to filter products
 *     responses:
 *       200:
 *         description: List of products for the given category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                   stockType:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   shippingInfo:
 *                     type: object
 *                     properties:
 *                       provider:
 *                         type: string
 *                       estimatedDeliveryDays:
 *                         type: integer
 *       404:
 *         description: No products found for this category
 *       500:
 *         description: Internal server error
 */
