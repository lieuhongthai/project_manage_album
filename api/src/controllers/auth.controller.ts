import jsonwebtoken from "jsonwebtoken";
import STATUS from "http-status";
import express, { Router } from 'express';
import UserModel from "../models/user.model";
import bcryptjs from "bcryptjs";
import UserRoleModel from "../models/user.role.model";
import { Op } from 'sequelize';
import { JWT_EXPIRES_IN, JWT_SECRET } from "../common/interfaces/constants";
import { Results } from "../common/interfaces/interfaces";
import { User } from "../models/user.model"

export async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
	const { username, email, password, roles } = req.body;
	const userCreate = await UserModel.create({
		username: username,
		email: email,
		password: bcryptjs.hashSync(password)
	}).then((user: any) => {
		if (roles) {
			UserRoleModel.findAll({
				where: {
					userRoleName: {
						[Op.or]: roles
					}
				}
			})
				.then((role: any) => {
					user.setRoles(role).then(() => {
						res.send({
							code: STATUS.CREATED,
							message: "User was registered successfully!",
							data: user,
						})
					})
				})
		}
		else {
			user.setRoles(["2a99379e-6581-49e5-88d7-b26e35f513d4"]).then(() => {
				res.send({
					code: STATUS.CREATED,
					message: "User was registered successfully!",
					data: user,
				})
			})
		}
	})
		.catch((err: any) => {
			res.status(STATUS.INTERNAL_SERVER_ERROR).send({
				code: STATUS.INTERNAL_SERVER_ERROR,
				message: err.message,
				data: null,
			})
		})
}

export async function signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
	console.log(12005, "req.body", req.body);

	await UserModel.findOne({
		where: {
			username: req.body.username
		}
	})
		.then((user: any) => {
			if (!user) {
				return res.status(STATUS.NOT_FOUND).send({
					code: STATUS.NOT_FOUND,
					message: "User Not found.",
					data: null,
				});
			}

			const passwordIsValid = bcryptjs.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {

				return res.send(STATUS.UNAUTHORIZED).send({
					code: STATUS.UNAUTHORIZED,
					message: "UNAUTHORIZED!",
					data: null,
				})
			}

			const token = jsonwebtoken.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

			let authorities: any[] = [];

			user.getRoles().then((role: any) => {
				for (let i = 0; i < role.length; i++) {
					authorities.push("ROLE_" + role[i].userRoleName.toUpperCase());
				}

				res.status(STATUS.OK).send({
					id: user.id,
					username: user.username,
					email: user.email,
					roles: authorities,
					accessToken: token
				});

			});
		})
		.catch((err: any) => {
			res.status(STATUS.INTERNAL_SERVER_ERROR).send({ message: err.message });
		})
}

export async function getUser(
	req: express.Request, res: express.Response, next: express.NextFunction

) {
	const result = { code: 0, message: "", data: null } as Results;
	try {
		const user = await UserModel.findAll() as User[];
		if (user && user.length > 0) {
			result.code = STATUS.OK;
			result.message = "Successfully!";
			result.data = user;
		}
		res.status(result.code).send(result);

	} catch (err: any) {
		res.status(STATUS.INTERNAL_SERVER_ERROR).send({ message: err.message });
	}
}