package com.nghiahd.server.repository;

import com.nghiahd.server.model.TaskForDepartmentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskForDepartmentRepositoryCustom {
    Page<TaskForDepartmentDTO> getListTFD(Pageable pageable);
}
