import { addNewPost, deletePost, getAllPosts, getPostById, updatePost } from "../services/post.service.js";

// Get All Posts Controller
export const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();

    res.status(200).json({ data: posts });
  } catch (error) {
    console.error("Error while fetching Posts:", error);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};

// Get Post By Id Controller
export const getPostByIdController = async (req, res) => {
  const { postId } = req.params;
  
  try {
    const post = await getPostById(postId);

    res.status(200).json({ data: post });
  } catch (error) {
    console.error("Error while fetching Posts:", error);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};

// Add New Post
export const addNewPostController = async (req, res) => {
  const postData = req.body;
  try {
    const newPost = await addNewPost({ ...postData, createdBy: req.user.id });

    res.status(201).json({
      data: newPost,
      message: "Post Added Successfully!"
    });
  } catch (error) {
    console.error("Error while Adding New Post:", error.message);

    const statusCode = error.status;
    const message = error.message;

    res.status(statusCode).json({
      message
    });
  }
};

// Update Post Controller
export const updatePostController = async (req, res) => {
  const { postId } = req.params;
  const postData = req.body;
  const { id: userId } = req.user.id;

  try {
    const post = getPostById(postId);

    if (post && post.createdBy._id !== userId) {
      res.status(403).json({
        message: "Access Denied!"
      });
    }

    const updatedPost = await updatePost(postId, { ...postData });

    res.status(200).json({
      data: updatedPost,
      message: "Post Updated Successfully!"
    });
  } catch (error) {
    console.error("Error while Update Post:", error.message);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};

// Delete Post Controller
export const deletePostController = async (req, res) => {
  const { postId } = req.params;
  const { id: userId } = req.user.id;

  try {
    const post = getPostById(postId);

    if (post && post.createdBy._id !== userId) {
      res.status(403).json({
        message: "Access Denied!"
      });
    }

    await deletePost(postId);

    res.status(200).json({
      message: "Post Deleted Successfully!"
    });
  } catch (error) {
    console.error("Error while Detele Post:", error.message);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};