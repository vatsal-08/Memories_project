import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";
export const getPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No post found with id: ${id}` });
  }
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getLikesOfPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    if (!post)
      return res.status(404).json({ message: `No post found with id: ${id}` });
    const likes = post?.likes;
    let peopleWhoLiked = User.find({ _id: { $in: likes } });
    res.status(200).json({
      likes,
      totalLikes: post?.likes?.length,
      peopleWhoLiked,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .lean();
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPostsBySearch = async (req, res) => {
  const { searchQuery = "", tags = "" } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const tagArray = tags ? tags.split(",") : [];
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tagArray } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPostsByCreator = async (req, res) => {
  const { name } = req.query;

  try {
    const posts = await PostMessage.find({ name });
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  try {
    const result = await PostMessage.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });
    if (!result) {
      return res.status(404).send(`Post not found with id: ${id}`);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: `Error updating post: ${error.message}` });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  try {
    const deletedPost = await PostMessage.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send(`Post not found with id: ${id}`);
    }
    res.json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  try {
    const post = await PostMessage.findById(id);
    if (!post) return res.status(404).send(`Post not found with id: ${id}`);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const post = await PostMessage.findById(id);
    if (!post)
      return res.status(404).json({ message: `Post not found with id: ${id}` });
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
