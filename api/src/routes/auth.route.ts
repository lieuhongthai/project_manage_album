import express, { Router } from 'express';
import STATUS from 'http-status';
import { getUser, signIn, signUp } from '../controllers/auth.controller';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middleware/verifySignup';


const authRouter = Router();
authRouter.post("/signUp", checkDuplicateUsernameOrEmail, checkRolesExisted, signUp);
authRouter.post("/signIn", signIn);
authRouter.get("/get", getUser)
export default authRouter;