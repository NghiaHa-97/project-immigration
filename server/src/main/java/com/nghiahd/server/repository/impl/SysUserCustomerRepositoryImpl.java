package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.repository.SysUserCustomerRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SysUserCustomerRepositoryImpl implements SysUserCustomerRepositoryCustom {
    @Autowired
    @PersistenceContext
    private  EntityManager entityManager;

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("username", "username");

        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("updateDate", "updateDate");

        return nameFieldMap;
    }

    @Override
    public Page<SysUserCustomerDTO> customerDTOPage(Pageable pageable){
        Map<String, Object> params = new HashMap<>();
        List<SysUserCustomerDTO> sysUserCustomerList = new ArrayList<>();

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
        sqlWhere.append(" where 1=1 ");;

        StringBuilder sqlCount = new StringBuilder(" select count(1) ");

        StringBuilder countItemQuery = new StringBuilder().append(sqlCount).append(sqlFrom).append(sqlWhere);
        Query countQuery = entityManager.createNativeQuery(countItemQuery.toString());
        PageUtilsCommon.setParams( countQuery, params);
        Number totalQuery = (Number) countQuery.getSingleResult();

        if (totalQuery.longValue() > 0) {
            StringBuilder itemQuery = new StringBuilder().append(sqlSelect).append(sqlFrom).append(sqlWhere)
                    .append(PageUtilsCommon.orderBySort(pageable, nameFieldMapSort(), params));
            Query query = entityManager.createNativeQuery(itemQuery.toString(), "SysUserCustomerListDTO");
            PageUtilsCommon.setParamsWithPageable(query, params, pageable);
            sysUserCustomerList = query.getResultList();
        }
        return new PageImpl<>(sysUserCustomerList, pageable, totalQuery.longValue());
    }
}
