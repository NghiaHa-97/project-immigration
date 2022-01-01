package com.nghiahd.server.repository;

import com.nghiahd.server.domain.TaskForDepartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskForDepartmentRepository extends JpaRepository<TaskForDepartment, UUID>, TaskForDepartmentRepositoryCustom {
}
