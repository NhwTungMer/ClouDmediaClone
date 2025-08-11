import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, CircularProgress } from '@mui/material';
import { setPosts } from 'state';
import PostWidget from './PostWidget';
import axios from 'axios';
import { URL_POST_LIKE, URL_POST_SHARE, getAssetUrl } from '../../routes';

const PostAction = () => {
  const { postId } = useParams();
  const loggedInUserId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.find((p) => p._id === postId));
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);

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


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(URL_POST_SHARE(postId));
        dispatch(setPosts({ post: response.data }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post', error);
        setLoading(false);
      }
    };

    if (!post) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [postId, post, dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography variant="h5">Post not found</Typography>;
  }

  return (
    <Box >
      <Typography variant="h4">{post.name}</Typography>
      <Typography variant="body1"></Typography>
      {post.picturePath && (
        <img
          width="50%"
          height="auto"
          
          alt="post"
          style={{ display: 'block', margin: '0.75rem auto', borderRadius: '0.75rem' }}
          src={getAssetUrl(post.picturePath)}
        />
      )}
      <PostWidget gap="0.3rem" 

        description=  {post.description}
        postId={post._id}
        likes={post.likes}
        comments={post.comments}
        isLiked={Boolean(post.likes[loggedInUserId])}
        onLikeToggle={patchLike}
      />
    </Box>
  );
};

export default PostAction;
