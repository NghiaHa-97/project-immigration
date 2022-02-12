package com.nghiahd.server.repository;

import com.nghiahd.server.model.AssignTasksDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface AssignTasksRepositoryCustom {
    Page<AssignTasksDTO> getPageAssignTasks(Pageable pageable);

    AssignTasksDTO getDetailByID(UUID id);

}
