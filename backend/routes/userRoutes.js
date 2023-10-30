import express from "express";
import { isAuthorized } from "../middlewares/authMiddleware.js";
import * as userController from "../controllers/userController.js";


const router = express.Router();

/*********** PRIVATE ROUTES **********/

//getting user profile route
router.get("/profile", isAuthorized, userController.userProfile);

//updating user profile route
router.put("/update-profile", isAuthorized, userController.updateUserProfile);

//updating user profile picture
router.put("/update-profile-picture", isAuthorized, userController.updateProfilePicture);


export default router;