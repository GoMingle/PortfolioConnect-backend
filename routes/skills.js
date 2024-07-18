
import { createUserSkill, getAllUserSkills, updateUserSkill, deleteUserSkill, getOneSkill } from "../controllers/skillsController.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";


export const skillRouter = Router();

skillRouter.post('/users/skills', checkUserSession, createUserSkill);

skillRouter.get('/users/skills', checkUserSession, getAllUserSkills);
skillRouter.get('/users/skills/:id', checkUserSession, getOneSkill);

skillRouter.patch('/users/skills/:id', checkUserSession, updateUserSkill);

skillRouter.delete('/users/skills/:id', checkUserSession, deleteUserSkill);