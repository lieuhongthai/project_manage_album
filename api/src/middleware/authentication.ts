import STATUS from "http-status";
import jsonwebtoken from "jsonwebtoken";
import express, { Router } from 'express';
import { Results } from "../common/interfaces/interfaces";
import { JWT_SECRET } from "../common/interfaces/constants";
import UserModel from "../models/user.model";

export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
	const token = req.headers["x-access-token"] as string;
	const route = req.headers.route as string;

	const result = { code: 0, message: "", data: null } as Results;

	if (!token) {
		result.message = "No token provided!";
		result.code = STATUS.FORBIDDEN;
		return res.status(STATUS.FORBIDDEN).send(result);
	}

	jsonwebtoken.verify(token, JWT_SECRET, (err: any, decoded: any) => {
		if (err) {
			result.code = STATUS.UNAUTHORIZED;
			result.message = "Unauthorized!";
			return result;
		}
		req.body.userId = decoded.id;
		next();
	})
}

export async function isAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
	await UserModel.findByPk(req.body.userId).then(
		(user: any) => {
			user.getRoles().then((roles: any) => {
				for (let i = 0; i < roles.length; i++) {
					if (roles[i].userRoleName = "admin") {
						next();
						return;
					}
				}
				res.send(STATUS.FORBIDDEN).send({
					code: STATUS.FORBIDDEN,
					message: "Require Admin Role!",
					data: null
				});
				return;
			})
		}
	)
}

export async function isModerator(req: express.Request, res: express.Response, next: express.NextFunction) {
	await UserModel.findByPk(req.body.userId).then(
		(user: any) => {
			user.getRoles().then((roles: any) => {
				for (let i = 0; i < roles.length; i++) {
					if (roles[i].userRoleName = "moderator") {
						next();
						return;
					}
				}
				res.send(STATUS.FORBIDDEN).send({
					code: STATUS.FORBIDDEN,
					message: "Require Moderator Role!",
					data: null
				});
				return;
			})
		}
	)
}

export async function isModeratorOrAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
	await UserModel.findByPk(req.body.userId).then(
		(user: any) => {
			user.getRoles().then((roles: any) => {
				for (let i = 0; i < roles.length; i++) {
					if (roles[i].userRoleName = "moderator") {
						next();
						return;
					}
				}
				res.send(STATUS.FORBIDDEN).send({
					code: STATUS.FORBIDDEN,
					message: "Require Moderator Role!",
					data: null
				});
				return;
			})
		}
	)
}