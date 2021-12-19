package com.nghiahd.server.repository.impl;

import com.nghiahd.server.repository.SysUserAdminRepositoryCustom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.persistence.EntityManager;
import java.util.Map;

public class SysUserAdminRepositoryImpl implements SysUserAdminRepositoryCustom {
    Logger log = LoggerFactory.getLogger(SysUserAdminRepositoryImpl.class);

    @Autowired
    EntityManager entityManager;

//    @Autowired
//    JdbcTemplate jdbcTemplate;

    @Autowired
    NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public Map<String, Object> getUserByUsernameAndPwd(String username) {
        log.info("checkUsernameAndPwd check password and username");
        StringBuilder sql = new StringBuilder();
        MapSqlParameterSource namedParameters
                = new MapSqlParameterSource()
                .addValue("username", username);
        sql.append(" select username, password " +
                " from SysUserAdmin " +
                " where Username = :username ");
        Map<String, Object> result = namedParameterJdbcTemplate.queryForMap(sql.toString(), namedParameters);
        return result;
    }

    @Override
    public Integer checkUsernameIsExist(String username) {
        log.info("checkUsernameIsExist check username exist");
        StringBuilder sql = new StringBuilder();
        MapSqlParameterSource namedParameters
                = new MapSqlParameterSource()
                .addValue("username", username);
        sql.append(" select count(1) as count " +
                " from SysUserAdmin " +
                " where Username = :username ");
        return namedParameterJdbcTemplate.queryForObject(sql.toString(), namedParameters, Integer.class);
    }


}
