package com.nghiahd.server.repository;

import com.nghiahd.server.domain.custom.TaskForDepartmentDomainCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskForDepartmentCusRepository extends JpaRepository<TaskForDepartmentDomainCustom, UUID> {
}
