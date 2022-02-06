package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.model.UserLoginRowMapper;
import com.nghiahd.server.repository.SysUserCustomerRepositoryCustom;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SysUserCustomerRepositoryImpl implements SysUserCustomerRepositoryCustom {
    Logger log = LoggerFactory.getLogger(SysUserCustomerRepositoryImpl.class);

    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("username", "username");
        nameFieldMap.put("isActive", "isActive");
        nameFieldMap.put("employeeCode", "employeeCode");
        nameFieldMap.put("employeeFullName", "employeeFullName");
        nameFieldMap.put("roleName", "roleName");
        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("updateDate", "updateDate");

        return nameFieldMap;
    }

    @Override
    public Page<SysUserCustomerDTO> customerDTOPage(Pageable pageable,
                                                    String username,
                                                    String employeeCode,
                                                    String employeeFullName,
                                                    String roleName) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select sys.id,\n" +
                "       sys.username,\n" +
                "       sys.employeeID,\n" +
                "       sys.isActive,\n" +
                "       sys.createDate,\n" +
                "       sys.updateDate,\n" +
                "       sys.roleID,\n" +
                "       e.Code     employeeCode,\n" +
                "       e.FullName employeeFullName,\n" +
                "       r.Name     roleName ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from SysUser sys\n" +
                "         left join Employee e on e.ID = sys.EmployeeID\n" +
                "         left join Role r on r.id = sys.RoleID ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where 1=1 ");
        if (Strings.isNotEmpty(username)) {
            sqlWhere.append(" and sys.username like :username ");
            params.put("username", "%" + username + "%");
        }
        if (Strings.isNotEmpty(employeeCode)) {
            sqlWhere.append(" and e.Code like :employeeCode ");
            params.put("employeeCode", "%" + employeeCode + "%");
        }
        if (Strings.isNotEmpty(employeeFullName)) {
            sqlWhere.append(" and e.FullName like :employeeFullName ");
            params.put("employeeFullName", "%" + employeeFullName + "%");
        }
        if (Strings.isNotEmpty(roleName )) {
            sqlWhere.append(" and r.Name like :roleName ");
            params.put("roleName", "%" + roleName + "%");
        }

        try {
            Page<SysUserCustomerDTO> page = PageUtilsCommon.getPage(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    nameFieldMapSort(),
                    params,
                    pageable,
                    entityManager,
                    "SysUserCustomerListDTO");
            return page;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public SysUserCustomerDTO findSysUserCustomerByID(Integer id) {
        if (id == null) {
            return null;
        }
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select sys.id,\n" +
                "       sys.username,\n" +
                "       sys.employeeID,\n" +
                "       sys.isActive,\n" +
                "       sys.createDate,\n" +
                "       sys.updateDate,\n" +
                "       sys.roleID,\n" +
                "       e.Code     employeeCode,\n" +
                "       e.FullName employeeFullName,\n" +
                "       r.Name     roleName ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from SysUser sys\n" +
                "         left join Employee e on e.ID = sys.EmployeeID\n" +
                "         left join Role r on r.id = sys.RoleID ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where 1=1 ");
        sqlWhere.append(" and sys.id = :id ");
        params.put("id", id);


        try {
            List<SysUserCustomerDTO> list = PageUtilsCommon.getList(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    params,
                    entityManager,
                    "SysUserCustomerListDTO");
            if (list.size() == 0) {
                return null;
            }
            return list.get(0);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserLogin getUserByUsername(String username) {
        log.info("checkUsernameAndPwd check password and username");
        StringBuilder sql = new StringBuilder();
        MapSqlParameterSource namedParameters
                = new MapSqlParameterSource()
                .addValue("username", username);

        sql.append(" select SU.id,\n" +
                "       SU.username,\n" +
                "       SU.password,\n" +
                "       SU.createDate,\n" +
                "       SU.updateDate,\n" +
                "       SU.roleID,\n" +
                "       SU.isActive,\n" +
                "       Su.employeeID,\n" +
                "       R.name roleName,\n" +
                "       P.code permissionCode,\n" +
                "       p.Name permissionName,\n" +
                "       M.Code moduleCode,\n" +
                "       M.Name moduleName,\n" +
                "       E.workUnitID,\n" +
                "       E.unitTypeID ");

        sql.append(" from SysUser SU\n" +
                "         left join Role R on SU.RoleID = R.ID\n" +
                "         left join PermissionRole PR on SU.RoleID = PR.RoleID\n" +
                "         left join Permission P on PR.PermissionID = P.ID\n" +
                "         left join Module M on M.ID = P.ModuleID\n" +
                "        left join Employee E on E.ID = SU.EmployeeID ");

        sql.append(" where Username = :username and IsActive = 1 ");
        Stream<UserLoginRowMapper> userLoginRowMappers =
                namedParameterJdbcTemplate.queryForStream(sql.toString(), namedParameters, (rs, rowNum) ->
                        new UserLoginRowMapper(
                                rs.getInt("id"),
                                rs.getString("username"),
                                rs.getString("password"),
                                rs.getTimestamp("createDate").toLocalDateTime(),
                                rs.getTimestamp("updateDate").toLocalDateTime(),
                                rs.getInt("roleID"),
                                rs.getString("roleName"),
                                rs.getInt("permissionCode"),
                                rs.getString("permissionName"),
                                rs.getInt("moduleCode"),
                                rs.getString("moduleName"),
                                rs.getBoolean("isActive"),
                                rs.getObject("employeeID", UUID.class),
                                rs.getInt("workUnitID"),
                                rs.getInt("unitTypeID")
                        )
                );
        Map<Integer, UserLogin> userLoginMap =
                userLoginRowMappers.collect(Collectors.toMap(UserLoginRowMapper::getId,
                        d -> new UserLogin(d.getId(),
                                d.getUsername(),
                                d.getPassword(),
                                d.getCreateDate(),
                                d.getUpdateDate(),
                                d.getRoleID(),
                                d.getRoleName(),
                                d.getPermissionCode(),
                                d.getPermissionName(),
                                d.getModuleCode(),
                                d.getModuleName(),
                                d.getIsActive(),
                                d.getEmployeeID(),
                                d.getWorkUnitID(),
                                d.getUnitTypeID()),
                        (d1, d2) -> {
                            d1.addItemToMapPermission(d2.getPermissionCode(), d2.getPermissionName());
                            d1.addItemToMapModule(d2.getModuleCode(), d2.getModuleName());
                            return d1;
                        }));


        if (userLoginMap.size() > 0) {
            Map.Entry<Integer, UserLogin> firstValue = userLoginMap.entrySet().iterator().next();
            UserLogin result = firstValue.getValue();
            result.setIsAdmin(false);
            return result;
        }
        return null;
    }

    @Override
    public Integer checkUsernameIsExist(String username) {
        log.info("checkUsernameIsExist check username exist");
        StringBuilder sql = new StringBuilder();
        MapSqlParameterSource namedParameters
                = new MapSqlParameterSource()
                .addValue("username", username);
        sql.append(" select count(1) as count " +
                " from SysUser " +
                " where Username = :username ");
        return namedParameterJdbcTemplate.queryForObject(sql.toString(), namedParameters, Integer.class);
    }


}
