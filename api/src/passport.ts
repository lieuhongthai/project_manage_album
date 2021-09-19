import passport from 'passport';
// import KEYS from './keys/keys';
import FacebookStrategy from "passport-facebook";
import FACEBOOK_KEY from './configs/facebook-key';


passport.serializeUser((user: any, done: any) => {
	done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
	done(null, user);
});
const options: FacebookStrategy.StrategyOptionWithRequest = {
	clientID: FACEBOOK_KEY.clientID,
	clientSecret: FACEBOOK_KEY.clientSecret,
	callbackURL: "/auth",
	passReqToCallback: true,
	profileFields: [
		// "id",
		"name",
		// "birthday",
		// "gender",
		"email",
		// "location",
		// "hometown"
	]
}

passport.use(
	new FacebookStrategy.Strategy(
		options
		, (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
			console.log(12005, "accessToken :", accessToken, "refreshToken :", refreshToken, "profile :", profile);
			done(null, { profile });
		}
	)
)

const passportFb = passport.authenticate("facebook");

export default passportFb;