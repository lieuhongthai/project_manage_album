import { DataTypes, Model, BuildOptions, UUIDV4 } from 'sequelize';
import sequelize from '../sequelize';
import UserRoleModel, { UserRole } from './user.role.model';

export interface User extends Model {
	readonly id: string;
	username: string;
	password: string;
	codeName: string;
	sureName: string;
	name: string;
	userRoleId: string;
	email: string;
	phone: string;
	authToken: string;
	expiryDate: Date;
	userRole?: UserRole;
}

const UserModel = sequelize.define<User>("user", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	codeName: {
		type: DataTypes.STRING,
	},
	surname: {
		type: DataTypes.STRING,
	},
	name: {
		type: DataTypes.STRING,
	},
	// userRoleId: {
	// 	type: DataTypes.UUID,
	// 	onUpdate: "CASCADE",
	// 	onDelete: "SET NULL",
	// 	references: {
	// 		model: UserRoleModel,
	// 		key: "id",
	// 	}
	// },
	username: {
		type: DataTypes.STRING,
	},
	password: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
	phone: {
		type: DataTypes.STRING,
	},
	authToken: {
		type: DataTypes.TEXT,
	},
	expiryDate: {
		type: DataTypes.DATEONLY,
	},
});

UserRoleModel.belongsToMany(UserModel, {
	through: "user_roles",
	foreignKey: "roleId",
	otherKey: "userId",
	as: "roles",
});

UserModel.belongsToMany(UserRoleModel, {
	through: "user_roles",
	foreignKey: "userId",
	otherKey: "roleId",
	as: "roles",
});

export default UserModel