# Migration Summary: Hardcoded URLs to Route Constants

This document summarizes the migration from hardcoded API URLs to centralized route constants in the CloudMedia Clone application.

## Overview
All hardcoded URLs like `https://cloudmediaclone-demo-t.onrender.com` have been replaced with constants from the `client/src/routes/` folder.

## Files Updated

### 1. Components
- **`client/src/components/UserImage.jsx`**
  - Old: `src={process.env.PUBLIC_URL + "/assets/" + image}`
  - New: `src={getAssetUrl(image)}`
  - Import: `import { getAssetUrl } from "../routes";`

- **`client/src/components/Friend.jsx`**
  - Old: `fetch(\`https://cloudmediaclone-demo-t.onrender.com/users/${userId}/${friendId}\`, ...)`
  - New: `fetch(URL_USER_FRIEND_ACTION(userId, friendId), ...)`
  - Import: `import { URL_USER_FRIEND_ACTION } from "../routes";`

### 2. Scenes
- **`client/src/scenes/loginPage/Form.jsx`**
  - Old: `https://cloudmediaclone-demo-t.onrender.com/auth/register`
  - New: `URL_AUTH_REGISTER`
  - Old: `https://cloudmediaclone-demo-t.onrender.com/auth/login`
  - New: `URL_AUTH_LOGIN`
  - Import: `import { URL_AUTH_REGISTER, URL_AUTH_LOGIN } from "../../routes";`

- **`client/src/scenes/profilePage/index.jsx`**
  - Old: `https://cloudmediaclone-demo-t.onrender.com/users/${userId}`
  - New: `URL_USER_BY_ID(userId)`
  - Import: `import { URL_USER_BY_ID } from "../../routes";`

### 3. Widgets
- **`client/src/scenes/widgets/PostAction.jsx`**
  - Old: `https://cloudmediaclone-demo-t.onrender.com/posts/${postId}/like`
  - New: `URL_POST_LIKE(postId)`
  - Old: `https://cloudmediaclone-demo-t.onrender.com/posts/share/${postId}`
  - New: `URL_POST_SHARE(postId)`
  - Old: `src={process.env.PUBLIC_URL + "/assets/" + post.picturePath}`
  - New: `src={getAssetUrl(post.picturePath)}`
  - Import: `import { URL_POST_LIKE, URL_POST_SHARE, getAssetUrl } from '../../routes';`

- **`client/src/scenes/widgets/MyPostWidget.jsx`**
  - Old: `https://cloudmediaclone-demo-t.onrender.com/posts`
  - New: `URL_POSTS_ALL`
  - Import: `import { URL_POSTS_ALL } from "../../routes";`

- **`client/src/scenes/widgets/FriendListWidget.jsx`**
  - Old: `https://cloudmediaclone-demo-t.onrender.com/users/${userId}/friends`
  - New: `URL_USER_FRIENDS(userId)`
  - Import: `import { URL_USER_FRIENDS } from "../../routes";`

- **`client/src/scenes/widgets/UserWidget.jsx`**
  - Old: `https://cloudmediaclone-demo-t.onrender.com/users/${userId}`
  - New: `URL_USER_BY_ID(userId)`
  - Import: `import { URL_USER_BY_ID } from "../../routes";`

- **`client/src/scenes/widgets/PostWidget.jsx`**
  - Old: `https://cloudmediaclone-demo-t.onrender.com/posts/share/${postId}`
  - New: `URL_POST_SHARE(postId)`
  - Old: `https://cloudmediaclone-demo-t.onrender.com/posts/${postId}/like`
  - New: `URL_POST_LIKE(postId)`
  - Old: `src={process.env.PUBLIC_URL + "/assets/" + picturePath}`
  - New: `src={getAssetUrl(picturePath)}`
  - Import: `import { URL_POST_LIKE, URL_POST_SHARE, getAssetUrl } from "../../routes";`
  - **New Features**: Comment system with add/delete functionality, delete post for owners

- **`client/src/scenes/widgets/AdvertWidget.jsx`**
  - Old: `src={process.env.PUBLIC_URL + "/assets/info4.jpeg"}`
  - New: `src={URL_ASSET_INFO4}`
  - Import: `import { URL_ASSET_INFO4 } from "../../routes";`

- **`client/src/scenes/widgets/PostsWidget.jsx`**
  - Old: `https://cloudmediaclone-demo-t.onrender.com/posts`
  - New: `URL_POSTS_ALL`
  - Old: `https://cloudmediaclone-demo-t.onrender.com/users/${userId}/posts`
  - New: `URL_POSTS_BY_USER(userId)`
  - Import: `import { URL_POSTS_ALL, URL_POSTS_BY_USER } from "../../routes";`

## New Route Constants Added

### Comment System
- `URL_POST_ADD_COMMENT(postId)` - Add comment to post
- `URL_POST_DELETE_COMMENT(postId, commentId)` - Delete comment

### Post Management
- `URL_POST_DELETE(postId)` - Delete post (owner only)

### User Search
- `URL_USER_SEARCH(query)` - Search users by name

## Benefits of Migration

1. **Maintainability**: Single source of truth for all API endpoints
2. **Consistency**: Standardized URL structure across the application
3. **Easy Updates**: Change base URL in one place
4. **Type Safety**: Better IDE support and error detection
5. **Documentation**: Centralized API documentation
6. **Testing**: Easier to mock and test API calls

## Usage Examples

### Before (Hardcoded)
```javascript
const response = await fetch(`https://cloudmediaclone-demo-t.onrender.com/posts/${postId}/like`, {
  method: "PATCH",
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({ userId }),
});
```

### After (Route Constants)
```javascript
import { URL_POST_LIKE } from '../routes';

const response = await fetch(URL_POST_LIKE(postId), {
  method: "PATCH",
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({ userId }),
});
```

## New Features Implemented

### 1. Post Sorting
- All post endpoints now return posts sorted by `createdAt` in descending order (newest first)
- Affects: `getFeedPosts`, `getUserPosts`, `createPost`, `likePost`, `sharePost`, `deletePost`

### 2. User Search Functionality
- **Backend**: New `/users/search` endpoint with regex-based name search
- **Frontend**: Search component integrated into navbar with debouncing and dropdown results

### 3. Comment System
- **Backend**: Enhanced Post model with structured comments (user info, timestamps)
- **Frontend**: Comment input, display with user avatars, delete functionality for comment owners
- **Features**: Add comments, delete own comments, real-time updates

### 4. Post Deletion
- **Backend**: DELETE `/posts/:id` endpoint with ownership verification
- **Frontend**: Delete button for post owners with confirmation

## Base URL Configuration
The base URL can be easily changed in `client/src/routes/apiRoutes.js`:
- **Development**: `http://localhost:3001`
- **Production**: `https://cloudmediaclone-demo-t.onrender.com`

## Migration Status
✅ **Complete**: All hardcoded URLs have been successfully migrated to route constants
✅ **Enhanced**: New features added (comments, search, post deletion, sorting)
✅ **Documented**: Comprehensive documentation and examples provided
