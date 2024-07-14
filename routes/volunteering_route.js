import { addVolunteering, getAllUserVolunteering, getOneVolunteering, patchVolunteering, deleteOneVolunteering} from "../controllers/volunteering_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";

const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteer', checkUserSession, addVolunteering)
volunteeringRouter.get('/users/volunteer', checkUserSession, getAllUserVolunteering)
volunteeringRouter.get('/users/volunteer/:id', checkUserSession, getOneVolunteering)
volunteeringRouter.patch('/users/volunteer/:id', checkUserSession, patchVolunteering)
volunteeringRouter.delete('/users/volunteer/:id', checkUserSession, deleteOneVolunteering)

export default volunteeringRouter;