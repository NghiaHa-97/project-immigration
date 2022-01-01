package com.nghiahd.server.service.impl;

import com.nghiahd.server.repository.TaskForAssistantRepository;
import com.nghiahd.server.service.TaskForAssistantService;
import org.springframework.stereotype.Service;

@Service
public class TaskForAssistantServiceImpl implements TaskForAssistantService {
    private final TaskForAssistantRepository taskForAssistantRepository;

    public TaskForAssistantServiceImpl(TaskForAssistantRepository taskForAssistantRepository) {
        this.taskForAssistantRepository = taskForAssistantRepository;
    }
}