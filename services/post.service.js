import Post from "../models/Post.model.js";

// Get All Posts
export const getAllPosts = async () => {
  return await Post.find({}).populate("createdBy", "name");
};

// Get Post By Id
export const getPostById = async (postId) => {
  const post = await Post.findOne({ _id: postId }).populate("createdBy", "name");

  if (!post) {
    const error = new Error("Post is not exists!");
    error.status = 404;
    throw error;
  }

  return post;
};

// Add New Post
export const addNewPost = async (postData) => {
  const newPost = await Post.create(postData);
  return newPost;
};

// Update Post
export const updatePost = async (postId, postData) => {
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    postData,
    { new: true }
  );

  console.log("Yest");

  if (!updatedPost) {
    const error = new Error("Post is not exists!");
    error.status = 404;
    throw error;
  }

  return updatedPost;
};

// Delete Post
export const deletePost = async (postId) => {
  const deletedPost = await Post.findByIdAndDelete(postId);
  if (!deletedPost) {
    const error = new Error("Post is not exists!");
    error.status = 404;
    throw error;
  }

  return deletedPost;
};