package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.ProfileDTO;
import com.nghiahd.server.repository.ProfileRepositoryCustom;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

public class ProfileRepositoryImpl implements ProfileRepositoryCustom {

    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ProfileDTO> getListProfile(Pageable pageable,
                                           String code,
                                           String projectMissionName,
                                           Integer statusProfileID,
                                           String employeeCreate,
                                           String approver,
                                           LocalDate expirationDate) {

        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select p.*,\n" +
//                "       wu_0.Name     unitCreateProfileName,\n" +
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
//                "         left join WorkUnit wu_0 on wu_0.ID = p.UnitCreateProfileID\n" +
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
        sqlWhere.append(" where 1=1 ");

        if (Strings.isNotEmpty(code)) {
            sqlWhere.append(" and p.code like :code ");
            params.put("code", "%" + code + "%");
        }
        if (Strings.isNotEmpty(projectMissionName)) {
            sqlWhere.append(" and pm.Name like :projectMissionName ");
            params.put("projectMissionName", "%" + projectMissionName + "%");
        }
        if (statusProfileID != null) {
            sqlWhere.append(" and sp.ID = :statusProfileID ");
            params.put("statusProfileID", statusProfileID);
        }
        if (Strings.isNotEmpty(employeeCreate)) {
            sqlWhere.append(" and (em_1.code like :employeeCreate or em_1.fullname like :employeeCreate) ");
            params.put("employeeCreate", "%" + employeeCreate + "%");
        }
        if (Strings.isNotEmpty(approver)) {
            sqlWhere.append(" and (em_0.code like :approver or em_0.fullname like :approver) ");
            params.put("approver", "%" + approver + "%");
        }
        if (expirationDate != null) {
            sqlWhere.append(" and p.expirationDate >= :expirationDate ");
            sqlWhere.append(" and p.expirationDate < :nextExpirationDate ");
            params.put("expirationDate", expirationDate);
            params.put("nextExpirationDate", expirationDate.plusDays(1));
        }

        try{
            Page<ProfileDTO> page = PageUtilsCommon.getPage(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    nameFieldMapSort(),
                    params,
                    pageable,
                    entityManager,
                    "ProfileListDTO");
            return page;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("code", "code");
        nameFieldMap.put("projectMissionName", "projectMissionName");
        nameFieldMap.put("statusProfileName", "statusProfileName");
        nameFieldMap.put("workUnitName", "workUnitName");
        nameFieldMap.put("departmentName", "departmentName");
        nameFieldMap.put("vehicleName", "vehicleName");
        nameFieldMap.put("quantityEmployee", "quantityEmployee");
        nameFieldMap.put("quantityExperts", "quantityExperts");
        nameFieldMap.put("employeeCreateName", "employeeCreateName");
        nameFieldMap.put("approverName", "approverName");
        nameFieldMap.put("unitCreateProfileName", "unitCreateProfileName");
        nameFieldMap.put("expirationDate", "expirationDate");
        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("updateDate", "updateDate");

        return nameFieldMap;
    }
}
