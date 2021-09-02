const SP_QUERY_LIST = {
	sp_develop_manage_detail_by_team_id: `
		CREATE PROCEDURE sp_develop_manage_detail_by_team_id(IN team_id varchar(50))
		BEGIN
  
		select
		  tp.id as user_team_project_id,
		  '' as colaction,
		  CONCAT(u.surname, " ", u.name)  as projectId,
		  0 as priority,
		  u.develop_section_name as section_name,
		  p.effect_factor,
		  p.effect,
		  '' as note,
		  p.releaseDate,
		  p.modify_datetime,
		  '' as deadline_datetime,
		  '' as plan_start_datetime,
		  '' as plan_end_datetime,
		  u.id as userid,
		  CONCAT(u.surname, " ", u.name)  as userfullname,
		  u.username,
		  tm.team_name,
		  tm.id as team_id,
		  CONCAT('SDA','-',projectId) as parent_id,
		  false as isEditMode
		from
		  t_user_team_project_handlers tp,
		  t_project_informations p,
		  m_teams tm,
		  t_ad_login_users u
		where
		  tp.team_id = tm.id
		and
		  tp.project_information_id = p.id
		and
		  tp.ad_login_user_id = u.id
		and
		  tm.id= team_id
		and
		  tp.delete_flag = 0;
  
		END
	`,

	sp_getAllTeamByAllPriority: `
		CREATE PROCEDURE sp_getAllTeamByAllPriority()
		BEGIN
  
		select
		  a.id,
		  a.priority,
		  a.show_on_screen,
		  a.delete_flag,
		  a.create_user_id,
		  a.create_user_name,
		  a.modify_user_id,
		  a.modify_user_name ,
		  b.team_id,
		  c.order,
		  c.team_name
		from
		  m_project_priorities as a
		left join
		  t_team_project_priority_handlers as b on a.id = b.priority
		left join
		  m_teams as c on b.team_id = c.id
		order by
			b.create_datetime ASC;
  
		END
	  `,

	sp_getAllTeamByOnePriority: `
		CREATE PROCEDURE sp_getAllTeamByOnePriority(IN priorityId varchar(200))
		BEGIN
  
		  select
			id as id_team, team_name ,priorityId as priority_id
		  from
			m_teams
		  where id in(
				select team_id from t_team_project_priority_handlers
				where priority =
				  (SELECT id from m_project_priorities
				where m_project_priorities.id = priorityId
				and m_project_priorities.delete_flag = '0')
				)
		  and
			delete_flag = '0';
  
		END
	  `,

	sp_getAllTeamWithoutTeamAlreadyHad: `
		CREATE PROCEDURE sp_getAllTeamWithoutTeamAlreadyHad(IN priorityId varchar(200))
		BEGIN
  
		  select
			a.id, a.team_name, a.order, b.priority
		  from
			m_teams as a
		  left join
			t_team_project_priority_handlers as b on a.id = b.team_id
		  where a.id not in (SELECT team_id
					FROM t_team_project_priority_handlers
					where priority = priorityId
					)
		  and
			a.delete_flag = 0
		  group by a.id
		  order by a.order ASC;
  
		END
	  `,

	sp_getMaxOrderInPriorityTable: `
		CREATE PROCEDURE sp_getMaxOrderInPriorityTable()
		BEGIN
  
		  SELECT MAX(${'`order`'}) as max_order FROM m_project_priorities AS m_project_priority where delete_flag = 0;
  
		END
	  `,

	sp_getMaxOrderInStatusTable: `
		CREATE PROCEDURE sp_getMaxOrderInStatusTable()
		BEGIN
  
		  SELECT MAX(${'`order`'}) as max_order FROM m_project_statuses AS m_project_status where delete_flag = 0;
  
		END
	  `,

	sp_report_project_filter: `
		CREATE PROCEDURE sp_report_project_filter(IN fromdate datetime, IN todate datetime, IN filtertype varchar(20), IN projectend int)
		BEGIN
  
		  if(filtertype = 'createdate')
		  then
			select
			  CONCAT (p.projectCode,'-', p.projectId) as projectId,
			  case
				when p.projectEnd = 0 then '未完了'
				when p.projectEnd = 1 then '完了'
			  end as projectEnd,
			  case
				when p.projectEnd = 0 then ''
				when p.projectEnd = 1 then 'bg-color-projectend'
			  end as cssSpecialClass,
			  p.projectPhaseId as projectPhaseId,
			  m.phase as phaseName,
			  p.projectName as projectName,
			  p.projectPhaseDetail as projectPhaseDetail,
			  case
				when p.requestCategory = 'application' then 'システムの開発・改修依頼'
				when p.requestCategory = 'license' then 'ITやデジタルを活用した問題解決の相談'
			  end as requestCategory,
			  p.projectName as projectName,
			  p.purpose,
			  p.overview,
			  p.cost,
			  p.effect,
			  DATE_FORMAT(p.modify_datetime,'%Y/%m/%d')  as modifyDatetime,
			  p.creater_section_name as createrSectionName,
			  p.releaseDate
			from
			  t_project_informations p
			inner join
			  m_project_phases m on p.projectPhaseId = m.id
			where
			  create_datetime between fromdate and todate
			and
			  (projectEnd = projectend or projectend = -1)
			ORDER BY
			  p.create_datetime ASC;
  
		  elseif(filtertype = 'modifydate')
		  then
			select
			  CONCAT (p.projectCode,'-', p.projectId) as projectId,
			case
				when p.projectEnd = 0 then ''
				when p.projectEnd = 1 then '完了'
			  end as projectEnd,
			  case
				when p.projectEnd = 0 then ''
				when p.projectEnd = 1 then 'bg-color-projectend'
			  end as cssSpecialClass,
			  p.projectPhaseId as projectPhaseId,
			  m.phase as phaseName,
			  p.projectName as projectName,
			  p.projectPhaseDetail as projectPhaseDetail,
			  case
				when p.requestCategory = 'application' then 'システムの開発・改修依頼'
				when p.requestCategory = 'license' then 'ITやデジタルを活用した問題解決の相談'
			  end as requestCategory,
			  p.projectName as projectName,
			  p.purpose,
			  p.overview,
			  p.cost,
			  p.effect,
			  DATE_FORMAT(p.modify_datetime,'%Y/%m/%d')  as modifyDatetime,
			  p.creater_section_name as createrSectionName,
			  p.releaseDate
			from
			  t_project_informations p inner join m_project_phases m
			on
			  p.projectPhaseId = m.id
			where
			  modify_datetime between fromdate and todate
			and
			  (projectEnd = projectend or projectend = -1)
			ORDER BY
			  p.create_datetime ASC;
		  end if;
  
		END
	  `,

	sp_report_project_quantity_by_request_category: `
		CREATE PROCEDURE sp_report_project_quantity_by_request_category(IN fromdate datetime, IN todate datetime, IN filtertype varchar(20))
		BEGIN
  
		if(filtertype = 'createdate')
		then
		  select
			pj.requestCategoryId as requestCategory
			, pj.projectPhaseId as projectPhaseId
			, p.phase as phaseName
			,  count(*) as quantity
			from
		  t_project_informations pj INNER JOIN m_project_phases p
		  ON pj.projectPhaseId = p.id
			where
			create_datetime between fromdate and todate
		  GROUP BY pj.requestCategoryId, pj.projectPhaseId, p.phase;
  
		elseif(filtertype = 'modifydate')
		then
		  select
		  pj.requestCategoryId as requestCategory
			, pj.projectPhaseId as projectPhaseId
			, p.phase as phaseName
			,  count(*) as quantity
		  from
			t_project_informations pj INNER JOIN m_project_phases p
			ON pj.projectPhaseId = p.id
			where
			modify_datetime between fromdate and todate
			GROUP BY pj.requestCategoryId, pj.projectPhaseId, p.phase;
  
		end if;
  
		END
	  `,

	sp_t_ad_user_login_getAdminDevList: `
		CREATE PROCEDURE sp_t_ad_user_login_getAdminDevList()
		BEGIN
  
		select
		  id,
		  employee_number,
		  concat(surname,' ', name) as fullname
		from
		  t_ad_login_users
		where
		  user_role_id ='8ec9eb5e-a85b-4585-9073-c72872acf5bf'
		or
		  user_role_id = 'f09b6395-84fd-4f46-aee9-33c60424b3ab'
		and
		  delete_flag = 0;
  
		END
	  `,

	sp_team_project_getByTeam: `
		CREATE PROCEDURE sp_team_project_getByTeam(IN team_id varchar(50))
		BEGIN
  
		select
		  '' as colaction,
		  p.id as project_information_id,
		  tp.id as team_project_id,
		  CONCAT('SDA','-',projectId) as projectId,
		  p.projectName,
		  p.projectStatusId,
		  p.priority,
		  tp.status as team_project_status,
		  tp.cost as team_project_cost,
		  p.creater_section_name as section_name,
		  p.relatedProjectId,
		  p.effect_factor,
		  p.effect,
		  '' as note,
		  p.releaseDate,
		  p.modify_datetime,
		  tp.team_mission,
		  tp.deadline_datetime,
		  tp.plan_start_datetime,
		  tp.plan_end_datetime,
		  false as isEditMode
		from
		  t_team_project_handlers tp,
		  t_project_informations p
		where
		  tp.project_information_id = p.id
		and
		  tp.team_id = team_id
		and
		  tp.team_mission = '開発担当'
		and
		  p.delete_flag = 0;
  
		END
	  `,

	sp_user_team_project_cost_detail_update: `
		CREATE PROCEDURE sp_user_team_project_cost_detail_update(IN team_id varchar(
		  IN id_update bigint(18),
		  day_1 decimal(10,2),day_2 decimal(10,2),day_3 decimal(10,2),
		  day_4 decimal(10,2),day_5 decimal(10,2),day_6 decimal(10,2),
		  day_7 decimal(10,2),day_8 decimal(10,2),day_9 decimal(10,2),
		  day_10 decimal(10,2),day_11 decimal(10,2),day_12 decimal(10,2),
		  day_13 decimal(10,2),day_14 decimal(10,2),day_15 decimal(10,2),
		  day_16 decimal(10,2),day_17 decimal(10,2),day_18 decimal(10,2),
		  day_19 decimal(10,2),day_20 decimal(10,2),day_21 decimal(10,2),
		  day_22 decimal(10,2),day_23 decimal(10,2),day_24 decimal(10,2),
		  day_25 decimal(10,2),day_26 decimal(10,2),day_27 decimal(10,2),
		  day_28 decimal(10,2),day_29 decimal(10,2),day_30 decimal(10,2),
		  day_31 decimal(10,2),
		  modify_user_id varchar(50), modify_user_name varchar(250)
		))
		BEGIN
  
		update
		  t_user_team_project_handlers_cost_details
		set
		  'day_1'= day_1,'day_2'= day_2,'day_3' = day_3,
		  'day_4' = day_4, 'day_5'= day_5, 'day_6'= day_6,
		  'day_7' = day_7, 'day_8'= day_8, 'day_9'= day_9,
		  'day_10' = day_10, 'day_11'= day_11, 'day_12'= day_12,
		  'day_13' = day_13, 'day_14'= day_14, 'day_15'= day_15,
		  'day_16' = day_16, 'day_17'= day_17, 'day_18'= day_18,
		  'day_19' = day_19, 'day_20'= day_20, 'day_21'= day_21,
		  'day_22' = day_22, 'day_23'= day_23, 'day_24'= day_24,
		  'day_25' = day_25, 'day_26'= day_26, 'day_27'= day_27,
		  'day_28' = day_28, 'day_29'= day_29, 'day_30'= day_30,
		  'day_31' = day_31, 'modify_user_id'= modify_user_id,
		  'modify_user_name' = modify_user_name, 'modify_datetime' = NOW()
		where 'id' = id_update;
		SELECT ROW_COUNT() as effect_rows;
  
		END
	  `,

	sp_user_team_project_handlers_cost_detail_getByTeamId: `
		CREATE PROCEDURE sp_user_team_project_handlers_cost_detail_getByTeamId(IN team_id varchar(50))
		BEGIN
  
		select
		  t.id as user_team_project_id,
		  t.project_information_id,
		  t.ad_login_user_id,
		  CONCAT(td.year_value, '/', LPAD(td.month_value, 2, 0)) as label,
		  CONCAT('month_', td.month_value) as 'key',
		  td.*,
		  CONCAT(
		  COALESCE(td.day_1,''),',', COALESCE(td.day_2,''),',',
		  COALESCE(td.day_3,''),',', COALESCE(td.day_4,''),',',
		  COALESCE(td.day_5,''),',', COALESCE(td.day_6,''),',',
		  COALESCE(td.day_7,''),',', COALESCE(td.day_8,''),',',
		  COALESCE(td.day_9,''),',', COALESCE(td.day_10,''),',',
		  COALESCE(td.day_11,''),',', COALESCE(td.day_12,''),',',
		  COALESCE(td.day_13,''),',', COALESCE(td.day_14,''),',',
		  COALESCE(td.day_15,''),',', COALESCE(td.day_16,''),',',
		  COALESCE(td.day_17,''),',', COALESCE(td.day_18,''),',',
		  COALESCE(td.day_19,''),',', COALESCE(td.day_20,''),',',
		  COALESCE(td.day_21,''),',', COALESCE(td.day_22,''),',',
		  COALESCE(td.day_23,''),',', COALESCE(td.day_24,''),',',
		  COALESCE(td.day_25,''),',', COALESCE(td.day_26,''),',',
		  COALESCE(td.day_27,''),',', COALESCE(td.day_28,''),',',
		  COALESCE(td.day_29,''),',', COALESCE(td.day_30,''),',',
		  COALESCE(td.day_31,'')
		  )  as 'value'
		from
		  t_user_team_project_handlers_cost_details td,
		  t_user_team_project_handlers t
		where
		  t.id= td.user_team_project_id
		  and t.team_id = team_id;
  
		END
	  `,

	t_user_team_project_handlers_cost_details_insert: `
		CREATE PROCEDURE t_user_team_project_handlers_cost_details_insert(
		  IN userTeamProjectId bigint(18),
		  IN monthValue smallint(2),
		  IN yearValue smallint(2),
		  IN createUserId varchar(50),
		  IN createUserName varchar(50)
		)
		BEGIN
  
		INSERT INTO t_user_team_project_handlers_cost_details (
		  user_team_project_id,
		  month_value,
		  year_value,
		  create_user_id,
		  create_user_name,
		  create_datetime
		)
  
		SELECT * FROM (
		  SELECT
		  userTeamProjectId,
		  monthValue,
		  yearValue,
		  createUserId,
		  createUserName,
		  NOW()
		) AS tmp
		WHERE NOT EXISTS (
			  SELECT 1 FROM t_user_team_project_handlers_cost_details WHERE
			  user_team_project_id = userTeamProjectId
			  and month_value= monthValue
			  and year_value= yearValue
		) LIMIT 1;
  
		if ROW_COUNT() =1 then
		select LAST_INSERT_ID() as new_id;
		else
		select id as new_id from t_user_team_project_handlers_cost_details WHERE
			user_team_project_id = userTeamProjectId
			and month_value= monthValue
			and year_value= yearValue;
		end if;
  
		END
	  `,

	t_user_team_project_handlers_insert: `
		CREATE PROCEDURE t_user_team_project_handlers_insert(
		  IN teamId varchar(50),
		  IN projectInfoId  varchar(50),
		  IN userId varchar(50),
		  IN mission varchar(50),
		  IN createUserId varchar(50),
		  IN createUserName varchar(30)
		)
		BEGIN
  
		INSERT INTO t_user_team_project_handlers (
		  team_id,
		  project_information_id,
		  ad_login_user_id,
		  user_mission,
		  delete_flag,
		  create_user_id,
		  create_user_name,
		  create_datetime
		)
  
		SELECT * FROM (
		  SELECT
		  teamId,
		  projectInfoId,
		  userId,
		  mission,
		  0,
		  createUserId,
		  createUserName,
		  NOW()
		) AS tmp
		WHERE NOT EXISTS (
			SELECT 1 FROM t_user_team_project_handlers WHERE team_id = teamId and project_information_id= projectInfoId and ad_login_user_id= userId and delete_flag=0
		) LIMIT 1;
  
  
		SELECT LAST_INSERT_ID() as new_id, ROW_COUNT() as inserted_rows ;
  
		END
	  `,

	team_project_quick_update_from_development_manage: `
		CREATE PROCEDURE team_project_quick_update_from_development_manage(
		  IN team_project_id varchar(50),
		  IN team_project_status varchar(50),
		  IN team_project_cost decimal(10,2),
		  IN deadline_datetime varchar(50),
		  IN plan_start_datetime varchar(50),
		  IN plan_end_datetime varchar(50),
		  IN modify_user_id varchar(50),
		  IN modify_user_name varchar(50)
		)
		BEGIN
  
		update
		  t_team_project_handlers
		  set
		  status = team_project_status,
		  cost = team_project_cost,
		  deadline_datetime = deadline_datetime,
		  plan_start_datetime = plan_start_datetime,
		  plan_end_datetime = plan_end_datetime,
		  modify_user_id = modify_user_id,
		  modify_user_name = modify_user_name
		where id= team_project_id;
  
		SELECT ROW_COUNT() as effect_rows;
  
		END
	  `,
};

export default SP_QUERY_LIST;