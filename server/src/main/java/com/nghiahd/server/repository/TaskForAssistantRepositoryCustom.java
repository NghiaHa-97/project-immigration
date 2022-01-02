package com.nghiahd.server.repository;

import com.nghiahd.server.model.TaskForAssistantDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskForAssistantRepositoryCustom {
    Page<TaskForAssistantDTO> getListTFA(Pageable pageable);
}
