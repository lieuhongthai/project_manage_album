import passport from "passport";
import PassportJwt from "passport-jwt";
import { JWT_SECRET } from "./common/interfaces/constants";
import { User } from "./models/user.model";


const jwtOptions: PassportJwt.StrategyOptions = {
	jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JWT_SECRET || "asdasdasfafasdasdasdsad",
}

const jwtVerifyCallback: PassportJwt.VerifiedCallback = (payload: any, done: PassportJwt.VerifiedCallback) => {
	console.log(12005, "payload", payload);

	const user = payload as User;
	done(null, user);
}

const jwtStrategy = new PassportJwt.Strategy(jwtOptions, jwtVerifyCallback);

passport.use(jwtStrategy);

// const 