import { Router } from "express";
import { checkUserSession } from "../middlewares/auth.js";
import { addProject, getAllUserProject, patchProject, deleteOneProject } from "../controllers/projectController.js";


const projectRouter = Router();

projectRouter.post('/users/project', checkUserSession, addProject);
projectRouter.get('/users/project', checkUserSession, getAllUserProject);
projectRouter.get('/users/project/:id', checkUserSession);
projectRouter.patch('/users/project/:id', checkUserSession, patchProject);
projectRouter.delete('/users/project/:id', checkUserSession, deleteOneProject);

export default projectRouter;