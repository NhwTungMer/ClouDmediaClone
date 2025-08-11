// API Routes Constants for CloudMedia Clone
// Base URL for the backend API
// export const BASE_URL = "https://cloudmediaclone-demo-t.onrender.com";
export const BASE_URL = "http://localhost:3001";
// Authentication Routes
export const URL_AUTH_LOGIN = `${BASE_URL}/auth/login`;
export const URL_AUTH_REGISTER = `${BASE_URL}/auth/register`;

// User Routes
export const URL_USER_BY_ID = (userId) => `${BASE_URL}/users/${userId}`;
export const URL_USER_FRIENDS = (userId) => `${BASE_URL}/users/${userId}/friends`;
export const URL_USER_FRIEND_ACTION = (userId, friendId) => `${BASE_URL}/users/${userId}/${friendId}`;
export const URL_USER_SEARCH = (query) => `${BASE_URL}/users/search?query=${encodeURIComponent(query)}`;

// Post Routes
export const URL_POSTS_ALL = `${BASE_URL}/posts`;
export const URL_POSTS_BY_USER = (userId) => `${BASE_URL}/posts/${userId}/posts`;
export const URL_POST_LIKE = (postId) => `${BASE_URL}/posts/${postId}/like`;
export const URL_POST_SHARE = (postId) => `${BASE_URL}/posts/share/${postId}`;
export const URL_POST_DELETE = (postId) => `${BASE_URL}/posts/${postId}`;

// Comment Routes
export const URL_POST_ADD_COMMENT = (postId) => `${BASE_URL}/posts/${postId}/comments`;
export const URL_POST_DELETE_COMMENT = (postId, commentId) => `${BASE_URL}/posts/${postId}/comments/${commentId}`;

// Asset Routes
export const URL_ASSET = (assetName) => `${BASE_URL}/assets/${assetName}`;
export const URL_ASSET_INFO4 = `${BASE_URL}/assets/info4.jpeg`;

// Helper function to get asset URL
export const getAssetUrl = (assetName) => `${BASE_URL}/assets/${assetName}`;

// Helper function to get user URL
export const getUserUrl = (userId) => `${BASE_URL}/users/${userId}`;

// Helper function to get post URL
export const getPostUrl = (postId) => `${BASE_URL}/posts/${postId}`;
