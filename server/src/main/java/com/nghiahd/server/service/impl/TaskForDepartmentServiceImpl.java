package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.TaskForDepartment;
import com.nghiahd.server.model.TaskForDepartmentDTO;
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

    public TaskForDepartmentServiceImpl(TaskForDepartmentRepository taskForDepartmentRepository) {
        this.taskForDepartmentRepository = taskForDepartmentRepository;
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
        Page<TaskForDepartmentDTO> listTFDs = taskForDepartmentRepository.getListTFD(pageable);
        return listTFDs;
    }

    @Override
    public TaskForDepartment getTFDByID(UUID id) {

        TaskForDepartment tfdDetail = taskForDepartmentRepository.findById(id).orElse(null);
        return tfdDetail;
    }


}
