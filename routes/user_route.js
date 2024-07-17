import { Router } from "express";
import { getUser, getUsers, login, logout, signUp, token } from "../controllers/userController.js";
import { checkUserSession } from "../middlewares/auth.js";



export const userRouter = Router();

userRouter.post('/auth/signup', signUp);
userRouter.post('/auth/login', login);
userRouter.post('/auth/token', token);
userRouter.get('/auth/getUser/:userName', getUser);
userRouter.get('/auth/getUsers', getUsers);
userRouter.post('/auth/logout', checkUserSession, logout);

