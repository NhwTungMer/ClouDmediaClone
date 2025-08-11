import express from "express";
import { getFeedPosts, getUserPosts, likePost, sharePost, deletePost, addComment, deleteComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.post('/share/:id',sharePost );

/* COMMENT OPERATIONS */
router.post("/:postId/comments", verifyToken, addComment);
router.delete("/:postId/comments/:commentId", verifyToken, deleteComment);

/* DELETE */
router.delete('/:id', verifyToken, deletePost);
export default router;
