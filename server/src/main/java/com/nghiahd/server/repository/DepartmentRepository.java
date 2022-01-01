package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    @Query(value = "select * from Department where WorkUnitID = ?1 order by Name", nativeQuery = true)
    List<Department> findDepartmentByWorkUnitID(int workUnitID);
}
