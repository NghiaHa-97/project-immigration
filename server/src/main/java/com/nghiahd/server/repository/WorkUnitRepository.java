package com.nghiahd.server.repository;

import com.nghiahd.server.domain.WorkUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface WorkUnitRepository extends JpaRepository<WorkUnit, Integer> {
    @Query(value = "select id, name from WorkUnit where UnitTypeID = ?1 order by name", nativeQuery = true)
    List<Map<String,Object>> findWorkUnitWithUnitTypeID(int unitTypeID);
}
