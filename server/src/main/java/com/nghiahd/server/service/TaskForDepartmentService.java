package com.nghiahd.server.service;

import com.nghiahd.server.domain.TaskForDepartment;
import com.nghiahd.server.domain.custom.TaskForDepartmentQuery;
import com.nghiahd.server.model.TaskForDepartmentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TaskForDepartmentService {
    TaskForDepartment saveTFD(TaskForDepartment req);

    TaskForDepartment editTFD(TaskForDepartment req, UUID id);

    void deleteTFD(UUID id);

    Page<TaskForDepartmentDTO> getListTFD(Pageable pageable);

    TaskForDepartmentQuery getTFDByID(UUID id);
}
