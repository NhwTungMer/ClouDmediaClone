import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Return all posts sorted by newest first
    const allPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const sharePost = async (req, res) => {
  try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }

      // Logic chia sẻ bài viết (ví dụ: tăng số lượng chia sẻ)
      post.shares += 1;
      await post.save();

      // Return all posts sorted by newest first
      const allPosts = await Post.find().sort({ createdAt: -1 });
      res.status(200).json(allPosts);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

/* COMMENT OPERATIONS */
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      text,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    const allPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const comment = post.comments[commentIndex];
    if (String(comment.userId) !== String(userId)) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    const allPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const requesterUserId = req.user?.id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!requesterUserId || String(post.userId) !== String(requesterUserId)) {
      return res.status(403).json({ message: "You are not allowed to delete this post" });
    }

    await Post.findByIdAndDelete(id);

    const remainingPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(remainingPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
