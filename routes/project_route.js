import { Router } from "express";
import { checkUserSession } from "../middlewares/auth.js";
import { addProject, getAllUserProject, patchProject, deleteUserProject, getOneProject } from "../controllers/projectController.js";
import { remoteUpload } from "../middlewares/upload.js";


const projectRouter = Router();

projectRouter.post('/users/project', checkUserSession, remoteUpload.single('image'), addProject);
projectRouter.get('/users/project', checkUserSession, getAllUserProject);
projectRouter.get('/users/project/:id', checkUserSession, getOneProject);
projectRouter.patch('/users/project/:id', checkUserSession, patchProject);
projectRouter.delete('/users/project/:id', checkUserSession, deleteUserProject);

export default projectRouter;