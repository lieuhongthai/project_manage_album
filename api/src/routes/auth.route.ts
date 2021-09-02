import express, { Router } from 'express';
import STATUS from 'http-status';
import { signIn, signUp } from '../controllers/auth.controller';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middleware/verifySignup';


const authRouter = Router();

authRouter.post("/signUp", checkDuplicateUsernameOrEmail, checkRolesExisted, signUp);
authRouter.post("/signIn", signIn);
authRouter.get("/get", (req: express.Request, res: express.Response) => {
	res.status(200).send({
		message: "aaaaaaaaaaaaaaaaaaaaaaaa"
	})
})
export default authRouter;