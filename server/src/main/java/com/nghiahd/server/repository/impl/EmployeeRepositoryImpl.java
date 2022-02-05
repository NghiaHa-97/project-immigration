package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.domain.Role;
import com.nghiahd.server.model.EmployeeDTO;
import com.nghiahd.server.repository.EmployeeRepositoryCustom;
import org.apache.logging.log4j.util.Strings;
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
        nameFieldMap.put("fullname", "fullname");
        nameFieldMap.put("gender", "gender");
        nameFieldMap.put("birthDay", "birthDay");
        nameFieldMap.put("positionName", "positionName");
        nameFieldMap.put("workUnitName", "workUnitName");
        nameFieldMap.put("cityProvinceName", "cityProvinceName");
        nameFieldMap.put("phoneNumber", "phoneNumber");
        nameFieldMap.put("numberIdentityCard", "numberIdentityCard");

        return nameFieldMap;
    }

    @Override
    public Page<EmployeeDTO> getPageEmployee(Pageable pageable,
                                             String code,
                                             String fullname,
                                             String workUnitName,
                                             String cityProvinceName,
                                             String phoneNumber,
                                             String numberIdentityCard) {

        Map<String, Object> params = new HashMap<>();

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
        sqlWhere.append(" where 1=1 ");

        if (Strings.isNotEmpty(code)) {
            sqlWhere.append(" and em.code like :code ");
            params.put("code", "%" + code + "%");
        }
        if (Strings.isNotEmpty(fullname)) {
            sqlWhere.append(" and em.fullname like :fullname ");
            params.put("fullname", "%" + fullname + "%");
        }
        if (Strings.isNotEmpty(workUnitName)) {
            sqlWhere.append(" and w.name like :workUnitName ");
            params.put("workUnitName", "%" + workUnitName + "%");
        }
        if (Strings.isNotEmpty(cityProvinceName)) {
            sqlWhere.append(" and city.Name like :cityProvinceName ");
            params.put("cityProvinceName", "%" + cityProvinceName + "%");
        }
        if (Strings.isNotEmpty(phoneNumber)) {
            sqlWhere.append(" and em.phoneNumber like :phoneNumber ");
            params.put("phoneNumber", "%" + phoneNumber + "%");
        }
        if (Strings.isNotEmpty(numberIdentityCard)) {
            sqlWhere.append(" and em.numberIdentityCard like :numberIdentityCard ");
            params.put("numberIdentityCard", "%" + numberIdentityCard + "%");
        }

        try{
            Page<EmployeeDTO> page = PageUtilsCommon.getPage(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    nameFieldMapSort(),
                    params,
                    pageable,
                    entityManager,
                    "EmployeeListDTO");
            return page;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
