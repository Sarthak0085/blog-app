import express from "express";
import * as commentController from "../controllers/commentController.js";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

/********* PRIVATE ROUTES **********/

// create comment
router.post("/", isAuthorized, commentController.createComment);

//update comment
router.put("/:commentId", isAuthorized, commentController.updateComment);

//update comment
router.put("/admin/:commentId", isAuthorized, isAdmin, commentController.updateCommentByAdmin);

//delete comment
router.delete("/:commentId", isAuthorized, commentController.deleteComment);


//get all commments
router.get("/", commentController.getAllComments);

//get all commments
router.get("/:userId",isAuthorized, commentController.getCommentsByUserId);

export default router;