import { DataTypes, Model, BuildOptions, UUIDV4, ModelDefined } from 'sequelize';
import { UserRoleName } from '../common/interfaces/enum';
import sequelize from '../sequelize';

export interface UserRole extends Model {
	readonly id: string;
	userRole: UserRoleName;
}

const UserRoleModel = sequelize.define<UserRole>(
	"roles",
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: UUIDV4,
		},
		userRoleName: {
			type: DataTypes.ENUM,
			values: Object.values(UserRoleName),
			allowNull: false,
		}
	}
)

export default UserRoleModel;