

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /product/createProduct:
 *   post:
 *     summary: Add or update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stockType:
 *                 type: string
 *                 enum: [in_store, virtual_stock]
 *               quantity:
 *                 type: number
 *               shippingInfo:
 *                 type: object
 *                 properties:
 *                   provider:
 *                     type: string
 *                   estimatedDeliveryDays:
 *                     type: integer
 *     responses:
 *       201:
 *         description: Product created or updated
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /product/getAllProduct:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 */

/**
 * @swagger
 * /product/updateProductById:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stockType:
 *                 type: string
 *                 enum: [in_store, virtual_stock]
 *               quantity:
 *                 type: number
 *               shippingInfo:
 *                 type: object
 *                 properties:
 *                   provider:
 *                     type: string
 *                   estimatedDeliveryDays:
 *                     type: integer
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /product/deleteProductById:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
