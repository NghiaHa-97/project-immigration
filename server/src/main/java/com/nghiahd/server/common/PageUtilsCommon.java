package com.nghiahd.server.common;

import org.springframework.data.domain.Pageable;

import javax.persistence.Query;
import java.util.Map;
import java.util.Set;

public class PageUtilsCommon {
    public static void setParamsWithPageable( Query query, Map<String, Object> params,  Pageable pageable,  Number total) {
        if (params != null && !params.isEmpty()) {
            Set<Map.Entry<String, Object>> set = params.entrySet();
            for (Map.Entry<String, Object> obj : set) {
                if(obj.getValue()!=null)
                    query.setParameter(obj.getKey(), obj.getValue());
            }
        }
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
    }

    public static void setParams( Query query, Map<String, Object> params) {
        if (params != null && !params.isEmpty()) {
            Set<Map.Entry<String, Object>> set = params.entrySet();
            for (Map.Entry<String, Object> obj : set) {
                if(obj.getValue()!=null)
                    query.setParameter(obj.getKey(), obj.getValue());
            }
        }
    }
}
