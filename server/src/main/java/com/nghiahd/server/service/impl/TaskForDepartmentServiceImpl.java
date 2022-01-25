package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.TaskForDepartment;
import com.nghiahd.server.domain.custom.TaskForDepartmentQuery;
import com.nghiahd.server.model.TaskForDepartmentDTO;
import com.nghiahd.server.repository.TaskForDepartmentCusRepository;
import com.nghiahd.server.repository.TaskForDepartmentRepository;
import com.nghiahd.server.service.TaskForDepartmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class TaskForDepartmentServiceImpl implements TaskForDepartmentService {
    private final TaskForDepartmentRepository taskForDepartmentRepository;
    private final TaskForDepartmentCusRepository taskForDepartmentCusRepository;

    public TaskForDepartmentServiceImpl(TaskForDepartmentRepository taskForDepartmentRepository, TaskForDepartmentCusRepository taskForDepartmentCusRepository) {
        this.taskForDepartmentRepository = taskForDepartmentRepository;
        this.taskForDepartmentCusRepository = taskForDepartmentCusRepository;
    }


    @Override
    public TaskForDepartment saveTFD(TaskForDepartment req) {
        req.setCreateDate(LocalDateTime.now());
        return taskForDepartmentRepository.save(req);
    }

    @Override
    public TaskForDepartment editTFD(TaskForDepartment req, UUID id) {
        Optional<TaskForDepartment> tfd = taskForDepartmentRepository.findById(id);
        if (tfd.isPresent()) {
            return taskForDepartmentRepository.save(req);
        }
        return null;
    }

    @Override
    public void deleteTFD(UUID id) {
        taskForDepartmentRepository.deleteById(id);
    }

    @Override
    public Page<TaskForDepartmentDTO> getListTFD(Pageable pageable) {
        return taskForDepartmentRepository.getListTFD(pageable);
    }

    @Override
    public TaskForDepartmentQuery getTFDByID(UUID id) {
        Optional<TaskForDepartmentQuery> taskForDepartmentCus = taskForDepartmentCusRepository.findById(id);
        return taskForDepartmentCus.orElse(null);
    }


}
