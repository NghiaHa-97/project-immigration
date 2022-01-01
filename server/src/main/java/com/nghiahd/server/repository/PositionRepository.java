package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PositionRepository extends JpaRepository<Position, Integer> {
    @Query(value = "select * from Position where departmentID = ?1 order by Name", nativeQuery = true)
    List<Position> findPositionByDepartmentID(int departmentID);
}
