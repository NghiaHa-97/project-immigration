package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.AssignTasksDTO;
import com.nghiahd.server.model.CommentDTO;
import com.nghiahd.server.repository.CommentRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class CommentRepositoryImpl implements CommentRepositoryCustom {
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public CommentDTO getDetailCommentByProfileIDAndEmployeeID(UUID employeeID, UUID profileID) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select c.id,\n" +
                "       c.employeeID,\n" +
                "       e.code     employeeCode,\n" +
                "       e.fullName employeeFullname,\n" +
                "       wu.name    workUnitName,\n" +
                "       c.profileID,\n" +
                "       p.code     profileCode,\n" +
                "       c.status,\n" +
                "       c.reason ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Comment c\n" +
                "         inner join Employee e on e.ID = c.EmployeeID\n" +
                "         inner join Profile p on p.ID = c.ProfileID\n" +
                "         inner join WorkUnit wu on e.WorkUnitID = wu.ID ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where e.ID = :employeeID and p.ID = :profileID ");
        params.put("employeeID", employeeID);
        params.put("profileID", profileID);

        try {
            List<CommentDTO> list = PageUtilsCommon.getList(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    params,
                    entityManager,
                    "CommentDTO");
            if (list.size()==0){
                return null;
            }
            return list.get(0);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public CommentDTO getDetailCommentByID(UUID id) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select c.id,\n" +
                "       c.employeeID,\n" +
                "       e.code     employeeCode,\n" +
                "       e.fullName employeeFullname,\n" +
                "       wu.name    workUnitName,\n" +
                "       c.profileID,\n" +
                "       p.code     profileCode,\n" +
                "       c.status,\n" +
                "       c.reason ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Comment c\n" +
                "         inner join Employee e on e.ID = c.EmployeeID\n" +
                "         inner join Profile p on p.ID = c.ProfileID\n" +
                "         inner join WorkUnit wu on e.WorkUnitID = wu.ID ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where c.id = :id ");
        params.put("id", id);

        try {
            List<CommentDTO> list = PageUtilsCommon.getList(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    params,
                    entityManager,
                    "CommentDTO");
            if (list.size()==0){
                return null;
            }
            return list.get(0);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<CommentDTO> getAllCommentByProfileID(UUID profileID) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select c.id,\n" +
                "       c.employeeID,\n" +
                "       e.code     employeeCode,\n" +
                "       e.fullName employeeFullname,\n" +
                "       wu.name    workUnitName,\n" +
                "       c.profileID,\n" +
                "       p.code     profileCode,\n" +
                "       c.status,\n" +
                "       c.reason ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Comment c\n" +
                "         inner join Employee e on e.ID = c.EmployeeID\n" +
                "         inner join Profile p on p.ID = c.ProfileID\n" +
                "         inner join WorkUnit wu on e.WorkUnitID = wu.ID ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where p.ID = :profileID ");
        params.put("profileID", profileID);

        try {
            List<CommentDTO> list = PageUtilsCommon.getList(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    params,
                    entityManager,
                    "CommentDTO");
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
