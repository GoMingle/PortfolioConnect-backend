import { addAchievement, getAllUserAchievement, getOneAchievement, patchAchievement, deleteOneAchievement} from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";

const achievementRouter = Router()

achievementRouter.post('/users/achievement', checkUserSession, addAchievement)
achievementRouter.get('/users/achievement', checkUserSession, getAllUserAchievement)
achievementRouter.get('/users/education/:id', checkUserSession, getOneAchievement)
achievementRouter.patch('/users/education/:id', checkUserSession, patchAchievement)
achievementRouter.delete('/users/education/:id', checkUserSession, deleteOneAchievement)

export default achievementRouter;