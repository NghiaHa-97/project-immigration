package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.AssignTasksDTO;
import com.nghiahd.server.repository.AssignTasksRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class AssignTasksRepositoryImpl implements AssignTasksRepositoryCustom {
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("id", "id");
        nameFieldMap.put("title", "title");
        nameFieldMap.put("employeeFullname", "employeeFullname");
        nameFieldMap.put("employeeCode", "employeeCode");
        nameFieldMap.put("departmentName", "departmentName");
        nameFieldMap.put("profileCode", "profileCode");
        nameFieldMap.put("projectMissionName", "projectMissionName");
        nameFieldMap.put("expirationDate", "expirationDate");
        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("updateDate", "updateDate");
        nameFieldMap.put("statusProfileName", "statusProfileName");
        nameFieldMap.put("employeeCreateFullName", "employeeCreateFullName");
        nameFieldMap.put("employeeCreateCode", "employeeCreateCode");
        return nameFieldMap;
    }

    @Override
    public Page<AssignTasksDTO> getPageAssignTasks(Pageable pageable) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select at.ID,\n" +
                "       at.DepartmentID,\n" +
                "       at.ProfileID,\n" +
                "       at.ExpirationDate,\n" +
                "       at.CreateDate,\n" +
                "       at.UpdateDate,\n" +
                "       at.EmployeeID,\n" +
                "       at.EmployeeCreateID,\n" +
                "       at.Title,\n" +
                "       p.Code       profileCode,\n" +
                "       pm.Name      projectMissionName,\n" +
                "       d.Name       departmentName,\n" +
                "       e.Code       employeeCode,\n" +
                "       e.FullName   employeeFullname,\n" +
                "       st.Name      statusProfileName,\n" +
                "       p.statusProfileID,\n" +
                "       emc.FullName employeeCreateFullName,\n" +
                "       emc.Code     employeeCreateCode," +
                "       null as description,\n" +
                "       null as result");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from AssignTasks at\n" +
                "         left join Profile p on p.ID = at.ProfileID\n" +
                "            left join StatusProfile st on st.ID = p.StatusProfileID\n" +
                "            left join Employee emc on emc.ID = at.EmployeeCreateID\n" +
                "         left join ProjectMission pm on pm.ID = p.ProjectMissionID\n" +
                "         left join Department d on d.ID = at.DepartmentID and at.EmployeeID is null\n" +
                "         left join Employee e on e.ID = at.EmployeeID and at.DepartmentID is null ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where 1=1 ");

        try {
            Page<AssignTasksDTO> page = PageUtilsCommon.getPage(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    nameFieldMapSort(),
                    params,
                    pageable,
                    entityManager,
                    "AssignTasksDTO");
            return page;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public AssignTasksDTO getDetailByID(UUID id) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select at.*,\n" +
                "       p.Code profileCode,\n" +
                "       pm.Name projectMissionName,\n" +
                "       d.Name departmentName,\n" +
                "       e.Code employeeCode,\n" +
                "       e.FullName employeeFullname,\n" +
                "       st.Name statusProfileName,\n" +
                "       p.statusProfileID,\n" +
                "       emc.FullName employeeCreateFullName,\n" +
                "       emc.Code employeeCreateCode ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from AssignTasks at\n" +
                "         left join Profile p on p.ID = at.ProfileID\n" +
                "            left join StatusProfile st on st.ID = p.StatusProfileID\n" +
                "            left join Employee emc on emc.ID = at.EmployeeCreateID\n" +
                "         left join ProjectMission pm on pm.ID = p.ProjectMissionID\n" +
                "         left join Department d on d.ID = at.DepartmentID and at.EmployeeID is null\n" +
                "         left join Employee e on e.ID = at.EmployeeID and at.DepartmentID is null ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where at.id = :id ");
        params.put("id", id);
        try {
            List<AssignTasksDTO> list = PageUtilsCommon.getList(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    params,
                    entityManager,
                    "AssignTasksDTO");
            if (list.size()==0){
                return null;
            }
            return list.get(0);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
