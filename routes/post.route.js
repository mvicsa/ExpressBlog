import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { addNewPostController, deletePostController, getAllPostsController, getPostByIdController, updatePostController } from "../controllers/post.controller.js";
import { addPostValidation, editPostValidation, validate } from "../middlewares/validation.middleware.js";

const postRouter = Router();

postRouter.get("/", getAllPostsController);
postRouter.get("/:postId", getPostByIdController);
postRouter.post("/", authenticate, validate(addPostValidation), addNewPostController);
postRouter.put("/:postId", authenticate, validate(editPostValidation), updatePostController);
postRouter.delete("/:postId", authenticate, deletePostController);

export default postRouter;
