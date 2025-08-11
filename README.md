# API Routes Documentation

This document describes the API routes and constants used in the CloudMedia Clone application.

## Base URL
- **Local Development**: `http://localhost:3001`
- **Production**: `https://cloudmediaclone-demo-t.onrender.com`

## Authentication Routes
- `URL_AUTH_LOGIN` - User login endpoint
- `URL_AUTH_REGISTER` - User registration endpoint

## User Routes
- `URL_USER_BY_ID(userId)` - Get user information by ID
- `URL_USER_FRIENDS(userId)` - Get user's friends list
- `URL_USER_FRIEND_ACTION(userId, friendId)` - Add/remove friend
- `URL_USER_SEARCH(query)` - Search users by name

## Post Routes
- `URL_POSTS_ALL` - Get all posts
- `URL_POSTS_BY_USER(userId)` - Get posts by specific user
- `URL_POST_LIKE(postId)` - Like/unlike a post
- `URL_POST_SHARE(postId)` - Share a post
- `URL_POST_DELETE(postId)` - Delete a post (owner only)

## Comment Routes
- `URL_POST_ADD_COMMENT(postId)` - Add a comment to a post
- `URL_POST_DELETE_COMMENT(postId, commentId)` - Delete a comment (owner only)

## Asset Routes
- `URL_ASSET(assetName)` - Get asset by name
- `URL_ASSET_INFO4` - Specific asset (info4.jpeg)
- `getAssetUrl(assetName)` - Helper function for asset URLs

## Helper Functions
- `getAssetUrl(assetName)` - Generate asset URL
- `getUserUrl(userId)` - Generate user profile URL
- `getPostUrl(postId)` - Generate post URL

## Usage Examples

### Adding a comment
```javascript
import { URL_POST_ADD_COMMENT } from '../routes';

const response = await fetch(URL_POST_ADD_COMMENT(postId), {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: 'Great post!' }),
});
```

### Deleting a comment
```javascript
import { URL_POST_DELETE_COMMENT } from '../routes';

const response = await fetch(URL_POST_DELETE_COMMENT(postId, commentId), {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Getting asset URL
```javascript
import { getAssetUrl } from '../routes';

const imageUrl = getAssetUrl('profile.jpg');
```

## Naming Convention
- **URL_** prefix for all route constants
- **POST_** prefix for post-related routes
- **USER_** prefix for user-related routes
- **AUTH_** prefix for authentication routes
- **ASSET_** prefix for asset routes
- **COMMENT_** prefix for comment-related routes

## Features
- **User Search**: Search users by first name or last name
- **Post Management**: Create, like, share, and delete posts
- **Comment System**: Add and delete comments with user information
- **Real-time Updates**: All operations return updated post lists
- **Authentication**: JWT-based authentication for protected routes
- **Asset Management**: Centralized asset URL generation
