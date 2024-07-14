import { addProfile, getAllUserProfile, getOneProfile, deleteOneProfile} from "../controllers/userProfileController.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";

const userProfileRouter = Router()

userProfileRouter.post('/users/profile', checkUserSession, addProfile)
userProfileRouter.get('/users/profile', checkUserSession, getAllUserProfile)
userProfileRouter.get('/users/profile/:id', checkUserSession, getOneProfile)
userProfileRouter.delete('/users/profile/:id', checkUserSession, deleteOneProfile)

export default userProfileRouter;