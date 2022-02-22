package com.nghiahd.server.repository;

import com.nghiahd.server.model.AssignTasksDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.UUID;

public interface AssignTasksRepositoryCustom {
    Page<AssignTasksDTO> getPageAssignTasks(Pageable pageable,
                                            String title,
                                            String employeeCode,
                                            String employeeFullname,
                                            String departmentName,
                                            String profileCode,
                                            Integer statusProfileID,
                                            LocalDate expirationDate);

    AssignTasksDTO getDetailByID(UUID id);

}
