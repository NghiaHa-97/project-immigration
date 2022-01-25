package com.nghiahd.server.repository;

import com.nghiahd.server.domain.custom.TaskForAssistantQuery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskForAssistantCusRepository extends JpaRepository<TaskForAssistantQuery, UUID>{
}
