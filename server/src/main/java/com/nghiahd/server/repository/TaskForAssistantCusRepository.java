package com.nghiahd.server.repository;

import com.nghiahd.server.domain.custom.TaskForAssistantCus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskForAssistantCusRepository extends JpaRepository<TaskForAssistantCus, UUID>{
}
