package com.nghiahd.server.repository.impl;

import com.nghiahd.server.common.PageUtilsCommon;
import com.nghiahd.server.model.LocationDTO;
import com.nghiahd.server.repository.LocationRepositoryCustom;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LocationRepositoryImpl implements LocationRepositoryCustom {
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<LocationDTO> getLocationByBounds(Double northEastLat,
                                                 Double northEastLng,
                                                 Double southWestLat,
                                                 Double southWestLng) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select lc.ID,\n" +
                "       lc.ObjectTypeID,\n" +
                "       lc.Name,\n" +
                "       lc.Longitude,\n" +
                "       lc.Latitude,\n" +
                "       lc.Description,\n" +
                "       lc.CityProvinceID,\n" +
                "       cp.Name CityProvinceName,\n" +
                "       lc.DistrictID,\n" +
                "       dt.Name districtName,\n" +
                "       lc.CommuneWardID,\n" +
                "       cw.Name communeWardName ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Location lc\n" +
                "    left join CityProvince cp on lc.CityProvinceID = cp.ID\n" +
                "    left join District dt on lc.DistrictID = dt.ID\n" +
                "    left join CommuneWard cw on lc.CommuneWardID = cw.ID ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where  (lc.Latitude between :southWestLat and :northEastLat)\n" +
                " and (lc.Longitude between :southWestLng and :northEastLng) ");
        params.put("northEastLat", northEastLat);
        params.put("southWestLat", southWestLat);
        params.put("northEastLng", northEastLng);
        params.put("southWestLng", southWestLng);

        try {
            List<LocationDTO> list = PageUtilsCommon.getList(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    params,
                    entityManager,
                    "LocationDTO");
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Page<LocationDTO> searchLocation(Pageable pageable, String name) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select lc.ID,\n" +
                "       lc.ObjectTypeID,\n" +
                "       lc.Name,\n" +
                "       lc.Longitude,\n" +
                "       lc.Latitude,\n" +
                "       lc.Description,\n" +
                "       lc.CityProvinceID,\n" +
                "       cp.Name CityProvinceName,\n" +
                "       lc.DistrictID,\n" +
                "       dt.Name districtName,\n" +
                "       lc.CommuneWardID,\n" +
                "       cw.Name communeWardName ");

        StringBuilder sqlWhere = new StringBuilder();
        if (Strings.isNotEmpty(name)) {
            sqlWhere.append(" where lc.Name like :param\n" +
                    "   or dt.Name like :param\n" +
                    "   or cw.Name like :param\n" +
                    "   or cp.Name like :param ");
            params.put("param", "%" + name + "%");
        }
        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Location lc\n" +
                "    left join CityProvince cp on lc.CityProvinceID = cp.ID\n" +
                "    left join District dt on lc.DistrictID = dt.ID\n" +
                "    left join CommuneWard cw on lc.CommuneWardID = cw.ID ");


        try {
            Page<LocationDTO> page = PageUtilsCommon.getPage(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    nameFieldMapSort(),
                    params,
                    pageable,
                    entityManager,
                    "LocationDTO");
            return page;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public LocationDTO getDetailDTO(Long id) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder sqlSelect = new StringBuilder();
        sqlSelect.append(" select lc.ID,\n" +
                "       lc.ObjectTypeID,\n" +
                "       lc.Name,\n" +
                "       lc.Longitude,\n" +
                "       lc.Latitude,\n" +
                "       lc.Description,\n" +
                "       lc.CityProvinceID,\n" +
                "       cp.Name CityProvinceName,\n" +
                "       lc.DistrictID,\n" +
                "       dt.Name districtName,\n" +
                "       lc.CommuneWardID,\n" +
                "       cw.Name communeWardName ");

        StringBuilder sqlFrom = new StringBuilder();
        sqlFrom.append(" from Location lc\n" +
                "    left join CityProvince cp on lc.CityProvinceID = cp.ID\n" +
                "    left join District dt on lc.DistrictID = dt.ID\n" +
                "    left join CommuneWard cw on lc.CommuneWardID = cw.ID ");

        StringBuilder sqlWhere = new StringBuilder();
        sqlWhere.append(" where lc.ID = :id");
        params.put("id", id);

        try {
            List<LocationDTO> list = PageUtilsCommon.getList(sqlSelect.toString(),
                    sqlFrom.toString(),
                    sqlWhere.toString(),
                    params,
                    entityManager,
                    "LocationDTO");
            if (list.size() == 0) {
                return null;
            }
            return list.get(0);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private Map<String, String> nameFieldMapSort() {
        Map<String, String> nameFieldMap = new HashMap<>();
        nameFieldMap.put("name", "name");

        return nameFieldMap;
    }
}
