package com.nghiahd.server.repository;

import com.nghiahd.server.domain.AssignTasks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AssignTasksRepository extends JpaRepository<AssignTasks, UUID>, AssignTasksRepositoryCustom {
}
