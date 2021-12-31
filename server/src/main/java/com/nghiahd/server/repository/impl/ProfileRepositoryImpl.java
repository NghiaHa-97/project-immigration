package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.ProfileDTO;
import com.nghiahd.server.repository.ProfileRepositoryCustom;
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

public class ProfileRepositoryImpl implements ProfileRepositoryCustom {

    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ProfileDTO> getListProfile(Pageable pageable) {

        Map<String, Object> params = new HashMap<>();
        List<ProfileDTO> profileDTOList = new ArrayList<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select p.*,\n" +
                "       wu_0.Name     unitCreateProfileName,\n" +
                "       em_0.FullName approverName,\n" +
                "       em_1.FullName employeeCreateName,\n" +
                "       emip.quantityEmployee,\n" +
                "       exip.quantityExperts,\n" +
                "       pm.Name       projectMissionName,\n" +
                "       wu_1.Name     workUnitName,\n" +
                "       dep.Name      departmentName,\n" +
                "       v.Name        vehicleName,\n" +
                "       sp.Name       statusProfileName ");


        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Profile p\n" +
                "         left join WorkUnit wu_0 on wu_0.ID = p.UnitCreateProfileID\n" +
                "         left join Employee em_0 on em_0.ID = p.ApproverID\n" +
                "         left join Employee em_1 on em_1.ID = p.EmployeeCreateID\n" +
                "         left join (select EmployeeInProfile.ProfileID, count(1) as quantityEmployee\n" +
                "                    from EmployeeInProfile as employeeInProfile\n" +
                "                    group by EmployeeInProfile.ProfileID) emip on p.ID = emip.ProfileID\n" +
                "\n" +
                "         left join (select expertsInProfile.ProfileID, count(1) as quantityExperts\n" +
                "                    from ExpertsInProfile as expertsInProfile\n" +
                "                    group by expertsInProfile.ProfileID) exip on p.ID = exip.ProfileID\n" +
                "\n" +
                "         left join ProjectMission pm on p.ProjectMissionID = pm.ID\n" +
                "         left join WorkUnit wu_1 on wu_1.ID = p.WorkUnitID\n" +
                "         left join Department dep on p.DepartmentID = p.DepartmentID\n" +
                "         left join Vehicle v on v.ID = p.VehicleID\n" +
                "         left join StatusProfile sp on sp.ID = p.StatusProfileID ");

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
            Query query = entityManager.createNativeQuery(itemQuery.toString(), "ProfileListDTO");
            PageUtilsCommon.setParamsWithPageable(query, params, pageable);
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
//        nameFieldMap.put("expertsCode", "expertsCode");
//        nameFieldMap.put("expertsFullName", "expertsFullName");
        nameFieldMap.put("projectMissionName", "projectMissionName");
        nameFieldMap.put("workUnitName", "workUnitName");
        nameFieldMap.put("departmentName", "departmentName");
        nameFieldMap.put("vehicleName", "vehicleName");
        nameFieldMap.put("statusProfileName", "statusProfileName");
        return nameFieldMap;
    }
}
