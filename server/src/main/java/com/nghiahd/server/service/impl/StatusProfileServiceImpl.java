package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.StatusProfile;
import com.nghiahd.server.repository.StatusProfileRepository;
import com.nghiahd.server.service.StatusProfileService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StatusProfileServiceImpl implements StatusProfileService {
    private final StatusProfileRepository statusProfileRepository;

    public StatusProfileServiceImpl(StatusProfileRepository statusProfileRepository) {
        this.statusProfileRepository = statusProfileRepository;
    }

    @Override
    public List<StatusProfile> getAll() {
        return this.statusProfileRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
