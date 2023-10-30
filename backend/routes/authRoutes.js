import express from "express";
import * as userController from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

/******* PUBLIC ROUTES *******/

//register route
router.post("/register", userController.registerUser);

//login route
router.post("/login", userController.loginUser);


export default router;