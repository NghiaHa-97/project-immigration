package com.nghiahd.server.repository;

import com.nghiahd.server.domain.custom.TaskForDepartmentQuery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskForDepartmentCusRepository extends JpaRepository<TaskForDepartmentQuery, UUID> {
}
