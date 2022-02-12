package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.domain.Experts;
import com.nghiahd.server.model.ExpertsDTO;
import com.nghiahd.server.repository.ExpertsRepositoryCustom;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

public class ExpertsRepositoryImpl implements ExpertsRepositoryCustom {
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("code", "code");
        nameFieldMap.put("fullname", "fullname");
        nameFieldMap.put("gender", "gender");
        nameFieldMap.put("birthDay", "birthDay");
        nameFieldMap.put("countryName", "countryName");
        nameFieldMap.put("religion", "religion");
        nameFieldMap.put("occupation", "occupation");
        nameFieldMap.put("permanentResidentialAddress", "permanentResidentialAddress");
        nameFieldMap.put("phoneNumber", "phoneNumber");
        nameFieldMap.put("passportNumber", "passportNumber");
        nameFieldMap.put("expiryDate", "expiryDate");
        nameFieldMap.put("dateOfEntry", "dateOfEntry");
        nameFieldMap.put("lengthOfStay", "lengthOfStay");
        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("updateDate", "updateDate");

        return nameFieldMap;
    }

    @Override
    public Page<ExpertsDTO> getPageExperts(Pageable pageable,
                                           String code,
                                           String fullname,
                                           String countryName,
                                           String permanentResidentialAddress,
                                           String phoneNumber,
                                           String passportNumber) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select ex.*, c.Name countryName ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Experts ex\n" +
                "         left join Country c on ex.CountryID = c.ID ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where 1=1 ");

        if (Strings.isNotEmpty(code)) {
            sqlWhere.append(" and ex.code like :code ");
            params.put("code", "%" + code + "%");
        }
        if (Strings.isNotEmpty(fullname)) {
            sqlWhere.append(" and ex.fullname like :fullname ");
            params.put("fullname", "%" + fullname + "%");
        }
        if (Strings.isNotEmpty(countryName)) {
            sqlWhere.append(" and c.Name like :countryName ");
            params.put("countryName", "%" + countryName + "%");
        }
        if (Strings.isNotEmpty(permanentResidentialAddress)) {
            sqlWhere.append(" and ex.permanentResidentialAddress like :permanentResidentialAddress ");
            params.put("permanentResidentialAddress", "%" + permanentResidentialAddress + "%");
        }
        if (Strings.isNotEmpty(phoneNumber)) {
            sqlWhere.append(" and ex.phoneNumber like :phoneNumber ");
            params.put("phoneNumber", "%" + phoneNumber + "%");
        }
        if (Strings.isNotEmpty(passportNumber)) {
            sqlWhere.append(" and ex.passportNumber like :passportNumber ");
            params.put("passportNumber", "%" + passportNumber + "%");
        }

        try{
            Page<ExpertsDTO> page = PageUtilsCommon.getPage(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    nameFieldMapSort(),
                    params,
                    pageable,
                    entityManager,
                    "ExpertsListDTO");
            return page;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void refresh(Experts ex) {
        this.entityManager.refresh(ex);
    }


}
