package com.nghiahd.server.service.impl;

import com.nghiahd.server.repository.TaskForDepartmentRepository;
import com.nghiahd.server.service.TaskForDepartmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TaskForDepartmentServiceImpl implements TaskForDepartmentService {
    private final TaskForDepartmentRepository taskForDepartmentRepository;

    public TaskForDepartmentServiceImpl(TaskForDepartmentRepository taskForDepartmentRepository) {
        this.taskForDepartmentRepository = taskForDepartmentRepository;
    }
}
