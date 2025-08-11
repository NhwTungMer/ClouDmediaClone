// Type definitions for API responses and requests
// Note: This file is for reference and documentation purposes

/**
 * User object structure
 * @typedef {Object} User
 * @property {string} _id - User unique identifier
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {string} picturePath - User's profile picture path
 * @property {Array<string>} friends - Array of friend IDs
 * @property {string} location - User's location
 * @property {string} occupation - User's occupation
 * @property {number} viewedProfile - Number of profile views
 * @property {number} impressions - Number of profile impressions
 */

/**
 * Post object structure
 * @typedef {Object} Post
 * @property {string} _id - Post unique identifier
 * @property {string} userId - ID of the user who created the post
 * @property {string} description - Post description
 * @property {string} picturePath - Post image path
 * @property {string} userPicturePath - User's profile picture path
 * @property {Array<string>} likes - Array of user IDs who liked the post
 * @property {Array<Comment>} comments - Array of comments on the post
 * @property {string} location - Post location
 * @property {Date} createdAt - Post creation date
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 */

/**
 * Comment object structure
 * @typedef {Object} Comment
 * @property {string} _id - Comment unique identifier
 * @property {string} userId - ID of the user who commented
 * @property {string} text - Comment text
 * @property {Date} createdAt - Comment creation date
 */

/**
 * API Response structure
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {string} message - Response message
 * @property {any} data - Response data
 * @property {number} statusCode - HTTP status code
 */

/**
 * Login Request structure
 * @typedef {Object} LoginRequest
 * @property {string} email - User's email
 * @property {string} password - User's password
 */

/**
 * Register Request structure
 * @typedef {Object} RegisterRequest
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email
 * @property {string} password - User's password
 * @property {string} picturePath - User's profile picture path
 * @property {string} location - User's location
 * @property {string} occupation - User's occupation
 */
