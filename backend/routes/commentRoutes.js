import express from "express";
import * as commentController from "../controllers/commentController.js";
import { isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

/********* PRIVATE ROUTES **********/

// create comment
router.post("/", isAuthorized, commentController.createComment);

//update comment
router.put("/:commentId", isAuthorized, commentController.updateComment);

//delete comment
router.delete("/:commentId", isAuthorized, commentController.deleteComment);

export default router;