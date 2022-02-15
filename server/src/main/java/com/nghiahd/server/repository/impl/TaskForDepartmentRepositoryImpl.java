//package com.nghiahd.server.repository.impl;
//
//import com.nghiahd.server.common.PageUtilsCommon;
//import com.nghiahd.server.model.TaskForDepartmentDTO;
//import com.nghiahd.server.repository.TaskForDepartmentRepositoryCustom;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import java.util.HashMap;
//import java.util.Map;
//
//public class TaskForDepartmentRepositoryImpl implements TaskForDepartmentRepositoryCustom {
//
//    @Autowired
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    @Override
//    public Page<TaskForDepartmentDTO> getListTFD(Pageable pageable) {
//        Map<String, Object> params = new HashMap<>();
//
//        StringBuilder sqlSelect = new StringBuilder();
//        sqlSelect.append("select tfd.*  " +
//                "     , dep.Name departmentName  " +
//                "     , pro.Code profileCode  " +
//                "     , pro.StatusProfileID statusProfileID  " +
//                "     , stp.Name statusProfileName  ");
//
//        StringBuilder sqlFrom = new StringBuilder();
//        sqlFrom.append("from TaskForDepartment tfd  " +
//                "         left join Department dep on tfd.DepartmentID = dep.ID  " +
//                "         left join Profile pro on tfd.ProfileID = pro.ID  " +
//                "         left join StatusProfile stp on pro.StatusProfileID = stp.ID");
//
//        StringBuilder sqlWhere = new StringBuilder();
//        sqlWhere.append(" where 1=1 ");
//
//        try{
//            Page<TaskForDepartmentDTO> page = PageUtilsCommon.getPage(sqlSelect.toString(),
//                    sqlFrom.toString(),
//                    sqlWhere.toString(),
//                    nameFieldMapSort(),
//                    params,
//                    pageable,
//                    entityManager,
//                    "tfdDTOList");
//            return page;
//        }catch (Exception e){
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    private Map<String, String> nameFieldMapSort() {
//        Map<String, String> nameFieldMap = new HashMap<>();
//        nameFieldMap.put("id", "id");
//        nameFieldMap.put("departmentID", "departmentID");
//        nameFieldMap.put("profileID", "profileID");
//        nameFieldMap.put("description", "description");
//        nameFieldMap.put("result", "result");
//        nameFieldMap.put("expirationDate", "expirationDate");
//        nameFieldMap.put("createDate", "createDate");
//        nameFieldMap.put("departmentName", "departmentName");
//        nameFieldMap.put("profileCode", "profileCode");
//        nameFieldMap.put("statusProfileID", "statusProfileID");
//        nameFieldMap.put("statusProfileName", "statusProfileName");
//        return nameFieldMap;
//    }
//}
