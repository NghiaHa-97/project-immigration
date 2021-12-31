package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.EmployeeDTO;
import com.nghiahd.server.repository.EmployeeRepositoryCustom;
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

public class EmployeeRepositoryImpl implements EmployeeRepositoryCustom {

    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("code", "code");

        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("updateDate", "updateDate");
        nameFieldMap.put("expirationDate", "expirationDate");

        return nameFieldMap;
    }

    @Override
    public Page<EmployeeDTO> getPageEmployee(Pageable pageable) {
        Map<String, Object> params = new HashMap<>();
        List<EmployeeDTO> employeeDTOList = new ArrayList<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select em.*,\n" +
                "       d.Name departmentName,\n" +
                "       p.Name positionName,\n" +
                "       w.name workUnitName,\n" +
                "       city.Name cityProvinceName,\n" +
                "       dis.Name districtName,\n" +
                "       com.Name communeWardName ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Employee em\n" +
                "         left join Department d on d.ID = em.DepartmentID\n" +
                "         left join Position p on p.ID=em.PositionID\n" +
                "         left join WorkUnit w on w.ID = em.WorkUnitID\n" +
                "         left join CityProvince city on city.ID = em.CityProvinceID\n" +
                "         left join District dis on dis.ID = em.DistrictID\n" +
                "         left join CommuneWard com on com.ID= em.CommuneWardID ");

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
            Query query = entityManager.createNativeQuery(itemQuery.toString(), "EmployeeListDTO");
            PageUtilsCommon.setParamsWithPageable(query, params, pageable);
            employeeDTOList = query.getResultList();
        }
        return new PageImpl<>(employeeDTOList, pageable, totalQuery.longValue());
    }
}
