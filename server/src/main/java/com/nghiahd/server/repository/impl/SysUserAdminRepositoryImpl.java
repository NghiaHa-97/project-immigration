package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.model.UserLoginRowMapper;
import com.nghiahd.server.repository.SysUserAdminRepositoryCustom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SysUserAdminRepositoryImpl implements SysUserAdminRepositoryCustom {
    Logger log = LoggerFactory.getLogger(SysUserAdminRepositoryImpl.class);

    @Autowired
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public UserLogin getUserByUsername(String username) {
        log.info("checkUsernameAndPwd check password and username");
        Map<String, Object> params = new HashMap<>();
        StringBuilder sqlSelect = new StringBuilder();

        sqlSelect.append(" select SUA.id, SUA.username, SUA.password, SUA.createDate, SUA.updateDate, SUA.roleID,\n" +
                "       R.name roleName,\n" +
                "       P.code permissionCode, p.Name permissionName,\n" +
                "        M.Code moduleCode, M.Name moduleName ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from SysUserAdmin SUA\n" +
                "    left join Role R on SUA.RoleID = R.ID\n" +
                "    left join PermissionRole PR on SUA.RoleID = PR.RoleID\n" +
                "    left join Permission P on PR.PermissionID = P.ID\n" +
                "    left join Module M on M.ID = P.ModuleID ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where Username = :username ");
        params.put("username", username);

        try {
            List<UserLoginRowMapper> list = PageUtilsCommon.getList(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    params,
                    entityManager,
                    "UserLoginRowMapperAdmin");
            Map<Integer, UserLogin> userLoginMap =
                    list.stream().collect(Collectors.toMap(UserLoginRowMapper::getId,
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
                UserLogin result = firstValue.getValue();
                result.setIsAdmin(true);
                return result;
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
