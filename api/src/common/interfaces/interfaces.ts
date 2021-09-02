export interface FolderIds {
	rootFolderId: string;
	adminFolderId: string;
	adminProjectFolderId: string;
	userFolderId: string;
	userProjectFolderId: string;
}

export interface FolderIds_Fixdrive {
	rootFolderId: string;
	projectFolderId: string;
	adminFolderId: string;
	userFolderId: string;
}

export interface Results {
	code: number;
	message: string;
	data: any;
}

export default interface User {
	id?: string;
	employee_number?: string;
	surname?: string;
	name?: string;
	username?: string;
	email?: string;
	develop_section_name?: string;
	develop_department_name?: string;
	user_role_id?: string | undefined;
	role?: string | undefined;
	auth_token?: string;
	create_user_id?: string;
	create_user_name?: string;
	modify_user_id?: string;
	modify_user_name?: string;
	menu?: string[];
	expire_date?: Date;
	file_max_size?: number;
	root_folder_URL?: string;
	appVersion?: string;
	appVersionDatetime?: string;
}

export interface AuthenticatingUser {
	username: string;
	password: string;
}

export interface PayLoad {
	id: string;
	employeeNumber: string;
	surname: string;
	name: string;
	username: string;
	email: string;
	section: string;
	department: string;
	roleId: string;
	role: string;
	authorityPath: string[];
}

export interface S3fileData {
	fileKey: string,
	rootFolder: string,
	parentFolder: string,
	childFolder: string,
	fileName: string,
	versionId: string,
}

export interface S3File {
	name: string,
	mimeType: string,
	buffer: Buffer,
}