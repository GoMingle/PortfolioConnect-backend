import { Router } from "express";
import { signUp } from "../controllers/userController.js";



export const userRouter = Router();

userRouter.post('/users/signUp', signUp);