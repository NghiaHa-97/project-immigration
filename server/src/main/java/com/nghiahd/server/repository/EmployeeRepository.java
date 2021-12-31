package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID>, EmployeeRepositoryCustom {
    @Query(value = "select count(1) FROM EmployeeInProfile e WHERE e.EmployeeID = ?1 ", nativeQuery = true)
    int checkExistEmployeeInProfile(UUID id);
}
