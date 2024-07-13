import { Router } from "express";
import { addExperience } from "../controllers/experienceController.js";

export const experienceRouter = Router();

experienceRouter.post('/users/experience', addExperience);


