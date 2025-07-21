
/**
 * @swagger
 * /banner/getCategoryByBanner/{bannerId}:
 *   get:
 *     summary: Get the category linked to a specific banner.
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the banner.
 *     responses:
 *       200:
 *         description: Category related to the banner.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *       400:
 *         description: Invalid banner ID.
 *       404:
 *         description: Banner not found.
 *       500:
 *         description: Internal server error.
 */
