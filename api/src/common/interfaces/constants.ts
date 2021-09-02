import dotenv from "dotenv";
import { join } from 'path';
import { convertStringToBoolean, convertStringToNumber } from "../utils";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "production";
export const PORT = process.env.PORT || '3000';
export const PORT_TEST = process.env.PORT_TEST || '4000';
export const HOST = process.env.HOST || 'geoex23f.geo.net';
export const MAIN_DOMAIN = process.env.DOMAIN || '@geonet.co.jp';
export const MAIL_SERVICE = process.env.MAIL_SERVICE || 'vietnam.system@geonet.co.jp';
export const STORAGE_LOCAL = process.env.STORAGE_LOCAL || './download';

export const APP_VERSION = process.env.APP_VERSION || '';
export const APP_VERSION_DATETIME = process.env.APP_VERSION_DATETIME || '';

/* JWT */
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h';

/* max file size in MB */
export const UPLOAD_FILE_MAX_SIZE = convertStringToNumber(process.env.UPLOAD_FILE_MAX_SIZE || '10');
export const ACCESS_LOG_FILE_MAX_SIZE = convertStringToNumber(process.env.ACCESS_LOG_FILE_MAX_SIZE || '20');
export const ERROR_LOG_FILE_MAX_SIZE = convertStringToNumber(process.env.ERROR_LOG_FILE_MAX_SIZE || '10');
export const CRON_JOB_FILE_MAX_SIZE = convertStringToNumber(process.env.CRON_JOB_FILE_MAX_SIZE || '10');


/* Moment.js */
export const MOMENT_TIME_ZONE = process.env.MOMENT_TIME_ZONE || 'Asia/Tokyo';
export const DATE_MIN = process.env.DATE_MIN || '1900-01-01';
export const DATE_MAX = process.env.DATE_MAX || '2100-12-31';

/* Mysql DB */
export const APP_DB_URL: string = process.env.APP_DB_URL || 'mysql://root:@127.0.0.1:3306/project_manage_album';

/* Oracle DB */
export const ORACLES_USER = process.env.ORACLES_USER || 'TOUGOU';
export const ORACLES_PASSWORD = process.env.ORACLES_PASSWORD || 'TEST';
export const ORACLES_CONNECTION_STRING =
	process.env.ORACLES_CONNECTION_STRING ||
	'(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=alexadr.geo.net)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=devanakin)))';
export const ORACLES_EXTERNAL_AUTH = convertStringToBoolean(process.env.ORACLES_EXTERNAL_AUTH || 'true');
/* Ldap */
export const LDAP_URI = process.env.LDAP_URI || 'LDAP://10.70.170.41/';
export const LDAP_BIND_DN = process.env.LDAP_BIND_DN || 'DC=geo,DC=net';

/* Cron Job */
export const CRON_TIME = process.env.CRON_TIME || '00 00 00 * * *';
export const CRON_TIME_ZONE = process.env.CRON_TIME_ZONE || 'Asia/Tokyo';

/** Googleapis */
export const GOOGLEAPIS_DRIVE_FILE = 'https://www.googleapis.com/auth/drive.file';
export const GOOGLEAPIS_SLOPES = [
	'https://www.googleapis.com/auth/cloud-platform',
	'https://www.googleapis.com/auth/drive.file',
	'https://www.googleapis.com/auth/admin.directory.user',
	'https://www.googleapis.com/auth/admin.directory.user.security',
	'https://www.googleapis.com/auth/admin.directory.group',
	'https://www.googleapis.com/auth/admin.directory.group.member',
	'https://www.googleapis.com/auth/gmail.metadata',
];

/* Google Drive */
export const GOOGLE_DRIVE_FOLDER_URL = process.env.GOOGLE_DRIVE_FOLDER_URL || 'https://drive.google.com/drive/folders/';
export const GOOGLE_DRIVE_FILE_URL = process.env.GOOGLE_DRIVE_FILE_URL || 'https://drive.google.com/file/d/{fileId}/view?';
export const ROOT_FOLDER = process.env.ROOT_FOLDER || 'ProjectManagement';
export const ADMIN_FOLDER = 'Admins';
export const USER_FOLDER = 'Users';
export const TEMP_FOLDER = 'Temporary';
export const ROOT_FOLDER_ID = '1cR2OARUp8xjTQQA5hFL4kNDnc8G9z3s0';
export const TEMP_FOLDER_ID = '13L1Zyo95KcFY3c2pH6k3czQHhet5Es9X';
// export const GOOGLE_DRIVE_KEY = require(join(__dirname, `../../../keys/${process.env.GOOGLE_DRIVE_KEY || ''}`));

/* AWS S3 */
export const AWS_S3_BUCKET_URL = process.env.AWS_S3_BUCKET_URL || 'https://bucketName.s3.AZ.amazonaws.com';
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'projectmanagementsystem';
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';

/* Recovery */
export const RECOVERY_FLAG = convertStringToBoolean(process.env.RECOVERY_FLAG || 'false');

/* Test user */
export const TEST_USER = convertStringToBoolean(process.env.TEST_USER_ON || 'false');