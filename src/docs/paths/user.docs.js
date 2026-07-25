/**
 * @openapi
 * tags:
 *   - name: Authentication
 *     description: Authentication and Account Management APIs
 */

/**
 * @openapi
 * /api/user:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Creates a new user account.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User created successfully
 *               data:
 *                 _id: 68824e0c9b5f3dbfd03ad123
 *                 name: Muhammad Patel
 *                 email: patel@gmail.com
 *                 role: User
 *
 *       400:
 *         description: Validation Error
 *
 *       409:
 *         description: User already exists
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login User
 *     description: Authenticates the user and returns an access token.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Login Successfully
 *               data:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   _id: 68824e0c9b5f3dbfd03ad123
 *                   name: Muhammad Patel
 *                   email: patel@gmail.com
 *                   role: User
 *                   is_active: true
 *                   profilePic: ""
 *
 *       400:
 *         description: Validation Error
 *
 *       401:
 *         description: Invalid Email or Password
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/user/refresh-token:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Refresh Access Token
 *     description: Generates a new access token using the refresh token stored in cookies.
 *
 *     responses:
 *       200:
 *         description: Token refreshed successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Token refreshed
 *               data:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *       401:
 *         description: Invalid or expired refresh token
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/user/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout User
 *     description: Clears authentication cookies and logs out the current user.
 *
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Logged out successfully
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Returns a list of all registered users.
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Users retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: users found successfully
 *               data:
 *                 - _id: 68824e0c9b5f3dbfd03ad123
 *                   name: Muhammad Patel
 *                   email: patel@gmail.com
 *                   role: User
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Returns a single user by ID.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User found successfully
 *               data:
 *                 _id: 68824e0c9b5f3dbfd03ad123
 *                 name: Muhammad Patel
 *                 email: patel@gmail.com
 *                 role: User
 *
 *       404:
 *         description: User not found
 *
 *       500:
 *         description: Internal Server Error
 *
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user
 *     description: Updates user information.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Muhammad Patel
 *             email: patel@gmail.com
 *
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User updated successfully
 *               data:
 *                 _id: 68824e0c9b5f3dbfd03ad123
 *                 name: Muhammad Patel
 *                 email: patel@gmail.com
 *                 role: User
 *
 *       400:
 *         description: Validation Error
 *
 *       404:
 *         description: User not found
 *
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user
 *     description: Deletes a user by ID.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User delete successfully
 *
 *       404:
 *         description: User not found
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/user/upload-profile/{id}:
 *   post:
 *     tags:
 *       - Users
 *     summary: Upload profile picture
 *     description: Uploads a profile image for the specified user.
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profile
 *             properties:
 *               profile:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Profile Image Uploaded Successfully
 *               data:
 *                 _id: 68824e0c9b5f3dbfd03ad123
 *                 profilePic: https://your-bucket.s3.amazonaws.com/profile.jpg
 *
 *       400:
 *         description: Invalid file
 *
 *       404:
 *         description: User not found
 *
 *       500:
 *         description: Internal Server Error
 */