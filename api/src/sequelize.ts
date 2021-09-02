import { Sequelize } from "sequelize";
import { APP_DB_URL } from "./common/interfaces/constants";

const sequelize = new Sequelize(APP_DB_URL, {
	logging: false,
	dialectOptions: {
		dateString: true,
		typeCast: true,
	},
});

export default sequelize;