import { addEducation, getAllUserEducation, getOneEducation, patchOneEducation, deleteOneEducation} from "../controllers/educationController.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";

const educationRouter = Router()

educationRouter.post('/users/education', checkUserSession, addEducation)
educationRouter.get('/users/education', checkUserSession, getAllUserEducation)
educationRouter.get('/users/education/:id', checkUserSession, getOneEducation)
educationRouter.patch('/users/education/:id', checkUserSession, patchOneEducation)
educationRouter.delete('/users/education/:id', checkUserSession, deleteOneEducation)

export default educationRouter;