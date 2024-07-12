import { Router } from "express";
import { login, signUp } from "../controllers/userController.js";
import { checkUserSession } from "../middlewares/auth.js";



export const userRouter = Router();

userRouter.post('/users/signUp', signUp);
userRouter.post('/users/login', checkUserSession, login);