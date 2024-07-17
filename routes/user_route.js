import { Router } from "express";
import { getUser, getUsers, login, logout, signUp, token } from "../controllers/userController.js";
import { checkUserSession } from "../middlewares/auth.js";



export const userRouter = Router();

userRouter.post('/users/auth/signup', signUp);
userRouter.post('/users/auth/sessionlogin', login);
userRouter.post('/users/auth/tokenlogin', token);
userRouter.get('/users/getUser/:username', getUser);
userRouter.get('/users/getUsers', getUsers);
userRouter.post('/users/auth/logout', checkUserSession, logout);

