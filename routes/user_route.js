import { Router } from "express";
import { getUser, getUsers, login, logout, signUp } from "../controllers/userController.js";
import { checkUserSession } from "../middlewares/auth.js";



export const userRouter = Router();

userRouter.post('/auth/signUp', signUp);
userRouter.post('/auth/login', checkUserSession, login);
userRouter.get('/auth/getUser/:userName', getUser);
userRouter.get('/auth/getUsers', getUsers);
userRouter.post('/auth/logout', logout);

