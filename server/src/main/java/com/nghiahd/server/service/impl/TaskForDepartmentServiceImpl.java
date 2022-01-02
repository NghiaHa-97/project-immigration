package com.nghiahd.server.service.impl;

import com.nghiahd.server.repository.TaskForDepartmentQueryRepository;
import com.nghiahd.server.repository.TaskForDepartmentRepository;
import com.nghiahd.server.service.TaskForDepartmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TaskForDepartmentServiceImpl implements TaskForDepartmentService {
    private final TaskForDepartmentRepository taskForDepartmentRepository;
    private final TaskForDepartmentQueryRepository taskForDepartmentQueryRepository;

    public TaskForDepartmentServiceImpl(TaskForDepartmentRepository taskForDepartmentRepository, TaskForDepartmentQueryRepository taskForDepartmentQueryRepository) {
        this.taskForDepartmentRepository = taskForDepartmentRepository;
        this.taskForDepartmentQueryRepository = taskForDepartmentQueryRepository;
    }


}
