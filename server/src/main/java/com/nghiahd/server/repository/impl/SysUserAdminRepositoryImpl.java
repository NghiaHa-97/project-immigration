package com.nghiahd.server.repository.impl;

import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.model.UserLoginRowMapper;
import com.nghiahd.server.repository.SysUserAdminRepositoryCustom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.persistence.EntityManager;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SysUserAdminRepositoryImpl implements SysUserAdminRepositoryCustom {
    Logger log = LoggerFactory.getLogger(SysUserAdminRepositoryImpl.class);

    @Autowired
    EntityManager entityManager;

//    @Autowired
//    JdbcTemplate jdbcTemplate;

    @Autowired
    NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public UserLogin getUserByUsername(String username) {
        log.info("checkUsernameAndPwd check password and username");
        StringBuilder sql = new StringBuilder();
        MapSqlParameterSource namedParameters
                = new MapSqlParameterSource()
                .addValue("username", username);

        sql.append(" select SUA.id, SUA.username, SUA.password, SUA.createDate, SUA.updateDate, SUA.roleID,\n" +
                "       R.name roleName,\n" +
                "       P.code permissionCode, p.Name permissionName,\n" +
                "        M.Code moduleCode, M.Name moduleName ");

        sql.append(" from SysUserAdmin SUA\n" +
                "    left join Role R on SUA.RoleID = R.ID\n" +
                "    left join PermissionRole PR on SUA.RoleID = PR.RoleID\n" +
                "    left join Permission P on PR.PermissionID = P.ID\n" +
                "    left join Module M on M.ID = P.ModuleID ");

        sql.append(" where Username = :username ");
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
                                rs.getString("moduleName")
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
                                d.getModuleName()),
                        (d1, d2) -> {
                            d1.addItemToMapPermission(d2.getPermissionCode(), d2.getPermissionName());
                            d1.addItemToMapModule(d2.getModuleCode(), d2.getModuleName());
                            return d1;
                        }));


        if (userLoginMap.size() > 0) {
            Map.Entry<Integer, UserLogin> firstValue = userLoginMap.entrySet().iterator().next();
            return firstValue.getValue();
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
                " from SysUserAdmin " +
                " where Username = :username ");
        return namedParameterJdbcTemplate.queryForObject(sql.toString(), namedParameters, Integer.class);
    }


}
