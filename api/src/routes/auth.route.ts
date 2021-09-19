import express, { Router } from 'express';
import STATUS from 'http-status';
import { getUser, signIn, signUp } from '../controllers/auth.controller';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middleware/verifySignup';
import passportLocal from '../passport-local';
import passport from 'passport';
import passportFb from '../passport';


const authRouter = Router();
authRouter.post("/signUp", checkDuplicateUsernameOrEmail, checkRolesExisted, signUp);
authRouter.post("/signIn", passportLocal, signIn);
authRouter.get("/get", getUser)
// authRouter.get("/facebook", passport.authenticate("facebook"))
authRouter.get("/facebook", passportFb, getUser);
authRouter.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: "/",
		failureRedirect: "/fail"
	})
);
authRouter.get("/fail", (req, res) => {
	res.send("Failed attempt");
});
authRouter.get("/", (req, res) => {
	console.log(req.body, req.user);

	res.send("Success");
});
export default authRouter;