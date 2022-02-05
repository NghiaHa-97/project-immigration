package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.TaskForAssistantDTO;
import com.nghiahd.server.repository.TaskForAssistantRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

public class TaskForAssistantRepositoryImpl implements TaskForAssistantRepositoryCustom {
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<TaskForAssistantDTO> getListTFA(Pageable pageable) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append("select tfa.*\n" +
                "     , e.Code              employeeCode\n" +
                "     , e.FullName          employeeFullName\n" +
                "     , pro.Code            profileCode\n" +
                "     , pro.StatusProfileID statusProfileID\n" +
                "     , stp.Name            statusProfileName\n"
               );

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append("from TaskForAssistant tfa\n" +
                "         left join Employee e on tfa.EmployeeID = e.ID\n" +
                "         left join Profile pro on tfa.ProfileID = pro.ID\n" +
                "         left join StatusProfile stp on pro.StatusProfileID = stp.ID");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where 1=1 ");

        try{
            Page<TaskForAssistantDTO> page = PageUtilsCommon.getPage(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    nameFieldMapSort(),
                    params,
                    pageable,
                    entityManager,
                    "tfaDTOList");
            return page;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("id", "id");
        nameFieldMap.put("employeeID", "employeeID");
        nameFieldMap.put("profileID", "profileID");
        nameFieldMap.put("description", "description");
        nameFieldMap.put("result", "result");
        nameFieldMap.put("expirationDate", "expirationDate");
        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("employeeCode", "employeeCode");
        nameFieldMap.put("employeeFullName", "employeeFullName");
        nameFieldMap.put("profileCode", "profileCode");
        nameFieldMap.put("statusProfileID", "statusProfileID");
        nameFieldMap.put("statusProfileName", "statusProfileName");
        return nameFieldMap;
    }
}
