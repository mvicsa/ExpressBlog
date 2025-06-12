import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  desc: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;