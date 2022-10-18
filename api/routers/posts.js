import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.route("/").get(getPosts).post(addPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

export default router;
