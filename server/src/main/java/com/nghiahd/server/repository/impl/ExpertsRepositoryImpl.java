package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.ExpertsDTO;
import com.nghiahd.server.model.ProfileDTO;
import com.nghiahd.server.repository.ExpertsRepositoryCustom;
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

public class ExpertsRepositoryImpl implements ExpertsRepositoryCustom {
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ExpertsDTO> getPageExperts(Pageable pageable) {
        Map<String, Object> params = new HashMap<>();
        List<ExpertsDTO> expertsDTOList = new ArrayList<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select ex.*, c.Name countryName ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Experts ex\n" +
                "         left join Country c on ex.CountryID = c.ID ");

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
            Query query = entityManager.createNativeQuery(itemQuery.toString(), "ExpertsListDTO");
            PageUtilsCommon.setParamsWithPageable(query, params, pageable);
            expertsDTOList = query.getResultList();
        }
        return new PageImpl<>(expertsDTOList, pageable, totalQuery.longValue());
    }

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("code", "code");

        nameFieldMap.put("createDate", "createDate");
        nameFieldMap.put("updateDate", "updateDate");
        nameFieldMap.put("expirationDate", "expirationDate");

        return nameFieldMap;
    }
}
