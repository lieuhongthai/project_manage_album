import express from "express";
import { getFilesSizeInBytes } from "./common/utils";
import path, { join } from "path";
import { ACCESS_LOG_FILE_MAX_SIZE, NODE_ENV, PORT } from "./common/interfaces/constants";
import fs from 'fs';
import { default as logger, default as morgan } from 'morgan';
import os from 'os';
import compression from 'compression';
import cors from "cors";
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import passport from 'passport';
import authRouter from "./routes/auth.route";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

let num = 0;
const app = express();

loadConfigs();
loadRoutes();
// loadFontEndReact();

export default app;

function loadConfigs() {
	let fileSize = getFilesSizeInBytes(join(__dirname, `/logs/access${num}.log`));
	// console.log(12005, "path : ", join(__dirname, `/logs/access${num}.log`));

	while (fileSize > ACCESS_LOG_FILE_MAX_SIZE) {
		num++;
		fileSize = getFilesSizeInBytes(join(__dirname, `/logs/access${num}.log`));
	}
	const accessLogStream = fs.createWriteStream(path.join(__dirname, `/logs/access${num}.log`), { flags: "a" });

	app.use(

		logger(
			'================================================================================================================' +
			os.EOL +
			'remote-addr: :remote-addr' +
			os.EOL +
			'remote-user: :remote-user' +
			os.EOL +
			'date: [:date[clf]]' +
			os.EOL +
			'method: ":method :url HTTP/:http-version"' +
			os.EOL +
			'status: :status :res[content-length]' +
			os.EOL +
			'referrer: ":referrer"' +
			os.EOL +
			'user-agent: ":user-agent"' +
			os.EOL +
			'req[query]: :req[query]' +
			os.EOL +
			'req[body]: :req[body]',
			{
				stream: accessLogStream,
			},
		)
	);

	app.use(morgan(NODE_ENV === "production" ? "common" : "dev", { stream: accessLogStream }));
	app.use(compression());

	app.use(express.json({ limit: "50mb" }));
	app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));
	app.use(cors());

	app.use(cookieParser());
	app.use(helmet());
	app.use(
		cookieSession({
			keys: ["session_key"],
		}),
	);
	/* init passport */
	app.use(passport.initialize());
	app.use(passport.session());
}

function loadRoutes() {
	const swaggerOptions = {
		swaggerDefinition: {
			openapi: '3.0.0',
			info: {
				title: 'Test Swagger API',
				description: "This is a REST API application made with Express! For Test.",
				version: '1.0.0'
			},
			servers: [
				{
					url: `http://localhost:${PORT}`,
					description: 'Development server',
				},
			],
		},
		apis: ['./definitions.yaml'],
	}

	const swaggerDocs = swaggerJsdoc(swaggerOptions);
	app.use("/swagger-api", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }))
	app.use('/auth', authRouter);
	// app.use('/api', verifyToken(), router);
	// app.use('/authGoogle', authGoogleRouter);
	// app.use('/amazoneS3', amazoneS3Router);
	// app.use('/authDrive', ConvertShiftDestinationToBoolean_API(), authDriveRouter);
	// app.use('/attach', fileUploadRouter);
	// app.use('/recovery', recoveryRouter);
	// app.use('/report', reportProjectRouter);
}

function loadFontEndReact() {
	app.use(express.static(path.join(__dirname, '../../build')));
	app.get('/*', function (req, res) {
		res.sendFile(path.join(__dirname, '../../build', 'index.html'));
	});
}
