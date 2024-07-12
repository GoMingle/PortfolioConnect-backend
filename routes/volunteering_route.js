import { addVolunteering, getAllUserVolunteering, getOneVolunteering, patchVolunteering, deleteOneVolunteering} from "../controllers/volunteering_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";

const volunteeringRouter = Router()

volunteeringRouter.post('/users/achievement', checkUserSession, addVolunteering)
volunteeringRouter.get('/users/achievement', checkUserSession, getAllUserVolunteering)
volunteeringRouter.get('/users/education/:id', checkUserSession, getOneVolunteering)
volunteeringRouter.patch('/users/education/:id', checkUserSession, patchVolunteering)
volunteeringRouter.delete('/users/education/:id', checkUserSession, deleteOneVolunteering)

export default volunteeringRouter;