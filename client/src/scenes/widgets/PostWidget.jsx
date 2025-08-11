import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutline,
  Send,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import { toast } from 'react-toastify';
import { URL_POST_LIKE, URL_POST_SHARE, getAssetUrl, URL_POST_DELETE, URL_POSTS_ALL, URL_POST_ADD_COMMENT, URL_POST_DELETE_COMMENT } from "../../routes";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  
  const sharePost = (postId) => {
    const frontendUrl = URL_POST_SHARE(postId);

    navigator.clipboard.writeText(frontendUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link.');
      });
  };

  const patchLike = async () => {
    const response = await fetch(URL_POST_LIKE(postId), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPosts = await response.json();
    dispatch(setPosts({ posts: updatedPosts }));
  };

  const deleteOwnPost = async () => {
    try {
      const response = await fetch(URL_POST_DELETE(postId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to delete post');
      }
      const remaining = await response.json();
      dispatch(setPosts({ posts: remaining }));
      toast.success('Post deleted');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const addComment = async () => {
    if (!commentText.trim()) return;
    
    try {
      const response = await fetch(URL_POST_ADD_COMMENT(postId), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText.trim() }),
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to add comment');
      }
      
      const updatedPosts = await response.json();
      dispatch(setPosts({ posts: updatedPosts }));
      setCommentText("");
      toast.success('Comment added');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(URL_POST_DELETE_COMMENT(postId, commentId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to delete comment');
      }
      
      const updatedPosts = await response.json();
      dispatch(setPosts({ posts: updatedPosts }));
      toast.success('Comment deleted');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const isOwner = String(postUserId) === String(loggedInUserId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={getAssetUrl(picturePath)}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <Box>
          {isOwner && (
            <IconButton onClick={deleteOwnPost} sx={{ mr: 1 }}>
              <DeleteOutline />
            </IconButton>
          )}
          <IconButton>
            <ShareOutlined onClick={() => sharePost(postId)}>
            </ShareOutlined>
          </IconButton>
        </Box>
      </FlexBetween>

      {/* Comment Input */}
      {isComments && (
        <Box mt="1rem">
          <FlexBetween gap="0.5rem">
            <InputBase
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addComment()}
              sx={{
                flex: 1,
                backgroundColor: palette.neutral.light,
                borderRadius: "20px",
                padding: "0.5rem 1rem",
              }}
            />
            <IconButton onClick={addComment} disabled={!commentText.trim()}>
              <Send />
            </IconButton>
          </FlexBetween>
        </Box>
      )}

      {/* Comments Display */}
      {isComments && (
        <Box mt="0.5rem">
          {comments.length === 0 ? (
            <Typography sx={{ color: main, textAlign: 'center', py: 2 }}>
              No comments yet. Be the first to comment!
            </Typography>
          ) : (
            comments.map((comment, i) => (
              <Box key={comment._id || i}>
                <Divider />
                <Box sx={{ p: "1rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <img
                    src={getAssetUrl(comment.userPicturePath)}
                    alt={`${comment.firstName} ${comment.lastName}`}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <FlexBetween>
                      <Typography sx={{ fontWeight: "bold", color: main }}>
                        {comment.firstName} {comment.lastName}
                      </Typography>
                      {String(comment.userId) === String(loggedInUserId) && (
                        <IconButton 
                          size="small" 
                          onClick={() => deleteComment(comment._id)}
                          sx={{ p: 0.5 }}
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      )}
                    </FlexBetween>
                    <Typography sx={{ color: main, mt: 0.5 }}>
                      {comment.text}
                    </Typography>
                    <Typography sx={{ color: main, fontSize: "0.75rem", mt: 0.5 }}>
                      {formatDate(comment.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          )}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
