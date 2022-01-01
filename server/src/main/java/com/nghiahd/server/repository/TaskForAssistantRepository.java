package com.nghiahd.server.repository;

import com.nghiahd.server.domain.TaskForAssistant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskForAssistantRepository extends JpaRepository<TaskForAssistant, UUID>, TaskForAssistantRepositoryCustom{
}
