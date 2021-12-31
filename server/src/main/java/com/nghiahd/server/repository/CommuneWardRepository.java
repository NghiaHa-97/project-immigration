package com.nghiahd.server.repository;

import com.nghiahd.server.domain.CommuneWard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommuneWardRepository extends JpaRepository<CommuneWard, Integer> {

    @Query(value = "select * from CommuneWard c where c.districtID = ?1 order by Name", nativeQuery = true)
    List<CommuneWard> findByDistrictIDOrderByNameAsc(int districtID);
}
