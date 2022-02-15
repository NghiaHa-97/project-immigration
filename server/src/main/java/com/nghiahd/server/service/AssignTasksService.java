package com.nghiahd.server.service;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.ExceptionApiCustom;
import com.nghiahd.server.domain.AssignTasks;
import com.nghiahd.server.model.AssignTasksDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface AssignTasksService {
    Page<AssignTasksDTO> getPageAssignTasks(Pageable pageable);

    AssignTasksDTO getDetailByID(UUID id);

    AssignTasks save(AssignTasks assignTasks) throws ExceptionApiCustom;
    AssignTasks edit(AssignTasks assignTasks, UUID id) throws ExceptionApiCustom;
    ApiResponseCode deleteByID(UUID id);
}
