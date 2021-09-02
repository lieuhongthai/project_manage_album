import STATUS from "http-status";
import express, { Router } from 'express';
import UserModel, { User } from "../models/user.model";

export function checkDuplicateUsernameOrEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
	const { username, email } = req.body

	UserModel.findOne({
		where: {
			username: username
		}
	}).then((user: any) => {
		console.log(req.body, user);

		if (user) {
			res.status(STATUS.BAD_REQUEST).send({
				message: "Failed! Username is already in use!"
			});
			return;
		}
		//Email
		UserModel.findOne({
			where: {
				email: email
			}
		}).then((user: any) => {
			if (user) {
				res.status(STATUS.BAD_REQUEST).send({
					code: STATUS.BAD_REQUEST,
					message: "Failed! Email is already in use!",
					data: null,
				});
				return;
			}
			next();
		});
	});
}

export function checkRolesExisted(req: express.Request, res: express.Response, next: express.NextFunction) {
	const ROLES = ["userRole", "adminRole", "moderatorRole"]
	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!ROLES.includes(req.body.roles[i])) {
				res.status(STATUS.BAD_REQUEST).send({
					code: STATUS.BAD_REQUEST,
					message: "Failed! Role does not exist = " + req.body.roles[i],
					data: null,
				});
				return;
			}
		}
	}
	next();
}