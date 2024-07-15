import { createUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfileController.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";
import { remoteUpload } from "../middlewares/upload.js";

const userProfileRouter = Router()

userProfileRouter.get('/users/profile', checkUserSession, getUserProfile)
userProfileRouter.post(
    "/users/userProfile",
    remoteUpload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    createUserProfile
)

userProfileRouter.patch(
    "/users/userProfile/:id",
    remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    updateUserProfile
  );

export default userProfileRouter;