import { createUserAchievement, getAllUserAchievements, updateUserAchievement, deleteUserAchievement} from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";

const achievementRouter = Router()

achievementRouter.post('/achievements', checkUserSession, createUserAchievement)
achievementRouter.get('/users/achievements', checkUserSession, getAllUserAchievements)
achievementRouter.patch('/users/achievements/:id', checkUserSession, updateUserAchievement)
achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteUserAchievement)

export default achievementRouter;