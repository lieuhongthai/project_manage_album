import passport from 'passport';
import PassportLocal from 'passport-local';
import UserModel from './models/user.model';
import bcryptjs from "bcryptjs";



const localVerify: PassportLocal.VerifyFunction = async (username, password, done) => {
	const result: any = {};
	await UserModel.findOne({
		where: {
			username: username
		}
	}).then((user: any) => {
		if (!user) {
			return done(user);
		}

		const passwordIsValid = bcryptjs.compareSync(
			password,
			user.password
		);

		if (!passwordIsValid) {
			return done(passwordIsValid);
		}
		else {
			return done(null, { username, password });
		}


		let authorities: any[] = [];

		user.getRoles().then((role: any) => {
			for (let i = 0; i < role.length; i++) {
				authorities.push("ROLE_" + role[i].userRoleName.toUpperCase());
			}

			const retData = ({
				id: user.id,
				username: user.username,
				email: user.email,
				roles: authorities,
			});

		});
	})
		.catch((err: any) => {
			return done(err);
		})
}
const strategy = new PassportLocal.Strategy(localVerify);

passport.use(strategy);

const passportLocal = passport.authenticate('local');//, { session: false }

export default passportLocal;