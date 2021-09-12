import fs from 'fs';
import http from 'http';
import NodeCache from "node-cache";
import app from './express';
import sequelize from './sequelize';

import { APP_DB_URL, NODE_ENV, PORT, STORAGE_LOCAL } from './common/interfaces/constants';
import { createSPS } from './storeprocedure/initialize.sp';
import UserRoleModel from './models/user.role.model';

const debug = require('debug')('project_management_system:server');
const port = PORT || 3002;

export const server = http.createServer(app);
export const myCache = new NodeCache({ stdTTL: 100, checkperiod: 1000 });

/**
 * create folder ./download/
 */
if (!fs.existsSync(STORAGE_LOCAL)) fs.mkdirSync(STORAGE_LOCAL);

/**
 * connect to MySQL Databases
 */
sequelize.sync({ alter: false, force: false })
	.catch((err: Error) => console.log("Database is error :", err.toString()))
	.then(() => {
		initial()
		// console.log("Drop and Resync Db	");
	});
sequelize.authenticate()
	.then(() => debug("Connected to MySQL :", APP_DB_URL))
	// .then(()=>createDumpData()) //dump data
	// .then(()=>createSPS()) //store procedure query
	.catch((err: Error) => debug("Unable to connect to the MySQL: ", err.toString()));

/**
 * port listening
 * */
server.listen(port);
// server.on('error', onError);
server.on('listening', () => {
	const addr = server.address();
	const bind = addr ? (typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port) : '';
	debug('Listening on ' + bind + ' - ' + NODE_ENV);
});

function initial() {
	UserRoleModel.create({
		userRoleName: "adminRole",
	});
	UserRoleModel.create({
		userRoleName: "moderatorRole",
	});
	UserRoleModel.create({
		userRoleName: "userRole",
	});
}


/**
 * connect to AWS S3
 * */
// s3.headBucket({ Bucket: AWS_S3_BUCKET_NAME }).promise()
//   .then(() => debug('Connected to S3 Bucket: ', AWS_S3_BUCKET_NAME))
//   .catch((err: Error) => debug('Unable to connect to the S3: ', err.toString()));

// /**
//  * connect to Google Drive
//  * */
// if (typeof getAuthenticateDrive === 'function')
//   getAuthenticateDrive().about.get({ fields: '*' })
//     .then(() => debug('Connected to Google Drive: ', GOOGLE_DRIVE_KEY.client_email))
//     .catch((err: Error) => debug('Unable to connect to the Google Drive: ', err.toString()));