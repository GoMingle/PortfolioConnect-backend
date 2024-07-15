import { createUserVolunteering, getAllUserVolunteering, updateUserVolunteering, deleteUserVolunteering} from "../controllers/volunteering_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";

const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkUserSession, createUserVolunteering)
volunteeringRouter.get('/users/volunteering', checkUserSession, getAllUserVolunteering)
volunteeringRouter.patch('/users/volunteering/:id', checkUserSession, updateUserVolunteering)
volunteeringRouter.delete('/users/volunteering/:id', checkUserSession, deleteUserVolunteering)

export default volunteeringRouter;