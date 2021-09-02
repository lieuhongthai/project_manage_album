import sequelize from "../sequelize"
import SP_QUERY_LIST from "./sp.list"

export const createSPS = async () => {
	sequelize.query(SP_QUERY_LIST.sp_develop_manage_detail_by_team_id)
		.then(() => console.log(`created SPS sp_develop_manage_detail_by_team_id() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_getAllTeamByAllPriority)
		.then(() => console.log(`created SPS sp_getAllTeamByAllPriority() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_getAllTeamByOnePriority)
		.then(() => console.log(`created SPS sp_getAllTeamByOnePriority() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_getAllTeamWithoutTeamAlreadyHad)
		.then(() => console.log(`created SPS sp_getAllTeamWithoutTeamAlreadyHad() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_getMaxOrderInPriorityTable)
		.then(() => console.log(`created SPS sp_getMaxOrderInPriorityTable() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_getMaxOrderInStatusTable)
		.then(() => console.log(`created SPS sp_getMaxOrderInStatusTable() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_report_project_filter)
		.then(() => console.log(`created SPS sp_report_project_filter() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_report_project_quantity_by_request_category)
		.then(() => console.log(`created SPS sp_report_project_quantity_by_request_category() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_t_ad_user_login_getAdminDevList)
		.then(() => console.log(`created SPS sp_t_ad_user_login_getAdminDevList() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_team_project_getByTeam)
		.then(() => console.log(`created SPS sp_team_project_getByTeam() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_user_team_project_cost_detail_update)
		.then(() => console.log(`created SPS sp_user_team_project_cost_detail_update() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.sp_user_team_project_handlers_cost_detail_getByTeamId)
		.then(() => console.log(`created SPS sp_user_team_project_handlers_cost_detail_getByTeamId() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.t_user_team_project_handlers_cost_details_insert)
		.then(() => console.log(`created SPS t_user_team_project_handlers_cost_details_insert() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.t_user_team_project_handlers_insert)
		.then(() => console.log(`created SPS t_user_team_project_handlers_insert() successfully`))
		.catch((err) => err);

	sequelize.query(SP_QUERY_LIST.team_project_quick_update_from_development_manage)
		.then(() => console.log(`created SPS team_project_quick_update_from_development_manage() successfully`))
		.catch((err) => err);
}