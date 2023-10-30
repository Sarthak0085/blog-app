import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import * as postController from "../controllers/postController.js";


const router = express.Router();

// create post and get all posts route
router.route("/")
    .post(isAuthorized, isAdmin, postController.createPost)
    .get(postController.getAllPosts);


// update post route
router.put("/:slug", isAuthorized, isAdmin, postController.updatePost)


//delete post route
router.delete("/:slug", isAuthorized, isAdmin, postController.deletePost);

//get post route
router.get("/:slug",  postController.getPost);

export default router;