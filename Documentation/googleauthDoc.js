/**
 * @swagger
 * tags:
 *   name: GoogleAuth
 *   description: Google OAuth endpoints
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Start Google OAuth login
 *     tags: [GoogleAuth]
 *     description: Redirects the user to Google's OAuth 2.0 consent screen to sign in.
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication.
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [GoogleAuth]
 *     description: Handles Google's redirect back to your app. Exchanges the code for tokens and logs in the user.
 *     responses:
 *       302:
 *         description: Redirects to success or failure route based on login result.
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out user
 *     tags: [GoogleAuth]
 *     description: Logs out the currently authenticated user and redirects to home.
 *     responses:
 *       302:
 *         description: Redirects to home page after logout.
 */


