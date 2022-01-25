package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.TaskForAssistant;
import com.nghiahd.server.domain.custom.TaskForAssistantQuery;
import com.nghiahd.server.model.TaskForAssistantDTO;
import com.nghiahd.server.repository.TaskForAssistantCusRepository;
import com.nghiahd.server.repository.TaskForAssistantRepository;
import com.nghiahd.server.service.TaskForAssistantService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class TaskForAssistantServiceImpl implements TaskForAssistantService {
    private final TaskForAssistantRepository taskForAssistantRepository;
    private final TaskForAssistantCusRepository taskForAssistantCusRepository;

    public TaskForAssistantServiceImpl(TaskForAssistantRepository taskForAssistantRepository, TaskForAssistantCusRepository taskForAssistantCusRepository) {
        this.taskForAssistantRepository = taskForAssistantRepository;
        this.taskForAssistantCusRepository = taskForAssistantCusRepository;
    }

    @Override
    public TaskForAssistant saveTFA(TaskForAssistant req) {
        req.setCreateDate(LocalDateTime.now());
        return taskForAssistantRepository.save(req);
    }

    @Override
    public TaskForAssistant editTFA(TaskForAssistant req, UUID id) {
        Optional<TaskForAssistant> tfd = taskForAssistantRepository.findById(id);
        if (tfd.isPresent()) {
            return taskForAssistantRepository.save(req);
        }
        return null;
    }

    @Override
    public void deleteTFA(UUID id) {
        taskForAssistantRepository.deleteById(id);
    }

    @Override
    public Page<TaskForAssistantDTO> getListTFA(Pageable pageable) {
        Page<TaskForAssistantDTO> listTFAs = taskForAssistantRepository.getListTFA(pageable);
        return listTFAs;
    }

    @Override
    public TaskForAssistantQuery getTFAByID(UUID id) {
        TaskForAssistantQuery taskForDepartmentQuery = taskForAssistantCusRepository.findById(id).get();
        return taskForDepartmentQuery;
    }

}
