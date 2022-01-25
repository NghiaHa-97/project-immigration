package com.nghiahd.server.common;

import org.springframework.data.domain.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.*;

public class PageUtilsCommon {

    private static final String DIRECTION_ASC = "ASC";
    private static final String DIRECTION_DESC = "DESC";
    private static final String SPACE = " ";
    private static final String THEN = " THEN ";

    public static Pageable createPageable(Pageable pageable) {
        return PageRequest.of(pageable.getPageNumber() - Constant.PAGING_STEP, pageable.getPageSize(), pageable.getSort());
    }

    public static Query setParamsWithPageable(Query query, Map<String, Object> params, Pageable pageable) {
        query = setParams(query, params);
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        return query;
    }

    public static Query setParams(Query query, Map<String, Object> params) {
        if (params != null && !params.isEmpty()) {
            Set<Map.Entry<String, Object>> set = params.entrySet();
            for (Map.Entry<String, Object> obj : set) {
                if (obj.getValue() != null)
                    query.setParameter(obj.getKey(), obj.getValue());
            }
        }
        return query;
    }

    /**
     * <k>
     * get key of maps
     * </k>
     */
    public static <K, V> K getKeyForSort(Map<K, V> map, V value) {
        for (Map.Entry<K, V> entry : map.entrySet()) {
            if (entry.getKey().equals(value)) {
                return entry.getKey();
            }
        }
        return null;
    }

    /**
     * <k>
     * get list key of maps
     * </k>
     */
    public static <K, V> Set<K> getKeysForSortMulti(Map<K, V> map, V value) {
        Set<K> keys = new HashSet<>();
        for (Map.Entry<K, V> entry : map.entrySet()) {
            if (entry.getValue().equals(value)) {
                keys.add(entry.getKey());
            }
        }
        return keys;
    }

    public static <K, V> V getValueForSort(Map<K, V> map, V value) {
        for (Map.Entry<K, V> entry : map.entrySet()) {
            if (entry.getKey().equals(value)) {
                return entry.getValue();
            }
        }
        return null;
    }

    public static StringBuilder orderBySort(Pageable pageable, Map<String, String> nameColumnMap, Map<String, Object> params) {
        String nameFieldSort = "";
        Sort sortsSort = pageable.getSort();
        Sort.Order orders = sortsSort.stream().findFirst().orElse(null);
        if (orders != null && orders.getProperty() != null && !orders.getProperty().isEmpty()) {
            if (!nameColumnMap.containsKey(orders.getProperty())) {
                return new StringBuilder();
            }
            nameFieldSort = nameColumnMap.get(orders.getProperty());
        }
        return buildSqlOrder(orders, nameFieldSort, params);
    }

    public static StringBuilder buildSqlOrder(Sort.Order orders, String nameFieldSort, Map<String, Object> params) {
        StringBuilder sqlOrderBy = new StringBuilder("");
        String typeDirection = orders.getDirection().name();
        if (typeDirection.isEmpty()) {
            return sqlOrderBy;
        }
        sqlOrderBy.append(" ORDER BY ").append(nameFieldSort);
        switch (typeDirection) {
            case DIRECTION_ASC:
                sqlOrderBy.append(" ASC ");
                break;
            case DIRECTION_DESC:
                sqlOrderBy.append(" DESC ");
                break;
            default:
                sqlOrderBy.setLength(0);
                break;
        }
        return sqlOrderBy;
    }

    public static <T> Page<T> getPage(String sqlSelect,
                                      String sqlFrom,
                                      String sqlWhere,
                                      Map<String, String> nameFieldsSort,
                                      Map<String, Object> params,
                                      Pageable pageable,
                                      EntityManager entityManager,
                                      Object nameClassDTO) throws Exception {
        List<T> listDto = new ArrayList<>();

        Query countQuery = entityManager.createNativeQuery(" select count(1) " + sqlFrom + " " + sqlWhere);
        PageUtilsCommon.setParams(countQuery, params);
        Number totalQuery = (Number) countQuery.getSingleResult();

        if (totalQuery.longValue() > 0) {
            String itemQuery = sqlSelect
                    + " "
                    + sqlFrom
                    + " "
                    + sqlWhere
                    + " "
                    + PageUtilsCommon.orderBySort(pageable, nameFieldsSort, params);
            Query query = null;
            switch (nameClassDTO.getClass().getSimpleName()){
                case "Class":
                    query = entityManager.createNativeQuery(itemQuery, (Class)nameClassDTO);
                    break;
                case "String":
                    query = entityManager.createNativeQuery(itemQuery, (String)nameClassDTO);
                    break;
            }
            if(query == null){
                throw new Exception("variable nameClassDTO in getPage() invalid.");
            }
            PageUtilsCommon.setParamsWithPageable(query, params, pageable);
            listDto = query.getResultList();
        }
        return new PageImpl<>(listDto, pageable, totalQuery.longValue());
    }
}
