package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.EmployeeDTO;
import com.nghiahd.server.model.ProjectMissionDTO;
import com.nghiahd.server.repository.ProjectMissionRepositoryCustom;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

public class ProjectMissionRepositoryImpl implements ProjectMissionRepositoryCustom {

    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("name", "name");
        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("updateDate", "updateDate");
        nameFieldMap.put("workUnitCreateName", "workUnitCreateName");
        nameFieldMap.put("employeeName", "employeeName");
        nameFieldMap.put("employeeCode", "employeeCode");
        return nameFieldMap;
    }

    @Override
    public Page<ProjectMissionDTO> getListProjectMission(Pageable pageable,
                                                         String name,
                                                         String workUnitCreateName,
                                                         String employeeName,
                                                         String employeeCode) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select pm.id,\n" +
                "       pm.name,\n" +
                "       pm.workUnitCreateID,\n" +
                "       wu.Name workUnitCreateName,\n" +
                "       pm.employeeID,\n" +
                "       e.fullName employeeName,\n" +
                "       e.code employeeCode,\n" +
                "       pm.createDate,\n" +
                "       pm.updateDate ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from ProjectMission pm\n" +
                "    left join WorkUnit wu on wu.ID = pm.WorkUnitCreateID\n" +
                "    left join Employee e on e.ID = pm.EmployeeID\n ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where 1=1 ");

        if (Strings.isNotEmpty(name)) {
            sqlWhere.append(" and pm.name like :name ");
            params.put("name", "%" + name + "%");
        }
        if (Strings.isNotEmpty(workUnitCreateName)) {
            sqlWhere.append(" and wu.Name like :workUnitCreateName ");
            params.put("workUnitCreateName", "%" + workUnitCreateName + "%");
        }
        if (Strings.isNotEmpty(employeeName)) {
            sqlWhere.append(" and e.fullName like :employeeName ");
            params.put("employeeName", "%" + employeeName + "%");
        }
        if (Strings.isNotEmpty(employeeCode)) {
            sqlWhere.append(" and e.code like :employeeCode ");
            params.put("employeeCode", "%" + employeeCode + "%");
        }

        try{
            Page<ProjectMissionDTO> page = PageUtilsCommon.getPage(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    nameFieldMapSort(),
                    params,
                    pageable,
                    entityManager,
                    "ProjectMissionDTO");
            return page;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
