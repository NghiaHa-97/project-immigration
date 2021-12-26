package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.ProfileDTO;
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

public class ProfileRepositoryImpl implements com.nghiahd.server.repository.ProfileRepositoryCustom {

    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ProfileDTO> getListProfile(Pageable pageable) {

        Map<String, Object> params = new HashMap<>();
        List<ProfileDTO> profileDTOList = new ArrayList<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append("select ")
                .append(" p.* ")
                .append(" ,e.Code                       expertsCode ")
                .append(" ,e.FullName                   expertsFullName ")
                .append(" ,pm.Name                      projectMissionName ")
                .append(" ,wu.Name                      workUnitName ")
                .append(" ,dep.Name                     departmentName ")
                .append(" ,v.Name                       vehicleName ")
                .append(" ,sp.Name                      statusProfileName ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Profile p ")
                .append(" left join ExpertsInProfile eip  on p.ID = eip.ProfileID ")
                .append(" left join Experts e on eip.ExpertsID = e.ID ")
                .append(" left join ProjectMission pm on p.ProjectMissionID = pm.ID ")
                .append(" left join WorkUnit wu on wu.ID = p.WorkUnitID ")
                .append(" left join Department dep on p.DepartmentID = p.DepartmentID ")
                .append(" left join Vehicle v on v.ID = p.VehicleID ")
                .append(" left join StatusProfile sp on sp.ID = p.StatusProfileID");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where 1=1 ");;

        StringBuilder sqlCount = new StringBuilder(" select count(*) ");

        StringBuilder countItemQuery = new StringBuilder().append(sqlCount).append(sqlFrom).append(sqlWhere);
        Query countQuery = entityManager.createNativeQuery(countItemQuery.toString());
        PageUtilsCommon.setParams( countQuery, params);
        Number totalQuery = (Number) countQuery.getSingleResult();

        if (totalQuery.longValue() > 0) {
            StringBuilder itemQuery = new StringBuilder().append(sqlSelect).append(sqlFrom).append(sqlWhere)
                    .append(PageUtilsCommon.orderBySort(pageable, nameFieldMapSort(), params));
            Query query = entityManager.createNativeQuery(itemQuery.toString(), "ProfileDTO");
            PageUtilsCommon.setParamsWithPageable(query, params, pageable, totalQuery);
            profileDTOList = query.getResultList();
        }
        return new PageImpl<>(profileDTOList, pageable, totalQuery.longValue());
    }

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("code", "code");
        nameFieldMap.put("description", "description");
        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("updateDate", "updateDate");
        nameFieldMap.put("expirationDate", "expirationDate");
        nameFieldMap.put("expertsCode", "expertsCode");
        nameFieldMap.put("expertsFullName", "expertsFullName");
        nameFieldMap.put("projectMissionName", "projectMissionName");
        nameFieldMap.put("workUnitName", "workUnitName");
        nameFieldMap.put("departmentName", "departmentName");
        nameFieldMap.put("vehicleName", "vehicleName");
        nameFieldMap.put("statusProfileName", "statusProfileName");
        return nameFieldMap;
    }
}
