package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.repository.SysUserCustomerRepositoryCustom;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SysUserCustomerRepositoryImpl implements SysUserCustomerRepositoryCustom {
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

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


}
