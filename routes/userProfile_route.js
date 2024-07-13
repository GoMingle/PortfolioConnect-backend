import { addProfile, getAllUserProfile, getOneProfile, deleteOneProfile} from "../controllers/userProfileController.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";

const userProfileRouter = Router()

userProfileRouter.post('/users/achievement', checkUserSession, addProfile)
userProfileRouter.get('/users/achievement', checkUserSession, getAllUserProfile)
userProfileRouter.get('/users/education/:id', checkUserSession, getOneProfile)
userProfileRouter.delete('/users/education/:id', checkUserSession, deleteOneProfile)

export default userProfileRouter;