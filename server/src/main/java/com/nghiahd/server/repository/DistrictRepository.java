package com.nghiahd.server.repository;

import com.nghiahd.server.domain.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Integer> {

    @Query(value = "select * from District d where d.cityProvinceID = ?1 order by Name", nativeQuery = true)
    List<District> findByCityProvinceIDOrderByNameAsc(int cityProvinceID);
}
