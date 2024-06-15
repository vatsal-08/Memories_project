import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const PostMessages = await PostMessage.find();
    console.log(PostMessages);
    res.status(200).json(PostMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(200).json(newPost);
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

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  try {
    const post = await PostMessage.findById(id);
    if (!post) {
      return res.status(404).send(`Post not found with id: ${id}`);
    }

    post.likeCount += 1;
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
