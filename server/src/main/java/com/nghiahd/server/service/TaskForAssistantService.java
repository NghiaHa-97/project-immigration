package com.nghiahd.server.service;

import com.nghiahd.server.domain.TaskForAssistant;
import com.nghiahd.server.domain.custom.TaskForAssistantDomainCustom;
import com.nghiahd.server.model.TaskForAssistantDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TaskForAssistantService {
    TaskForAssistant saveTFA(TaskForAssistant req);

    TaskForAssistant editTFA(TaskForAssistant req, UUID id);

    void deleteTFA(UUID id);

    Page<TaskForAssistantDTO> getListTFA(Pageable pageable);

    TaskForAssistantDomainCustom getTFAByID(UUID id);
}
