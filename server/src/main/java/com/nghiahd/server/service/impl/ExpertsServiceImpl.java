package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.Experts;
import com.nghiahd.server.repository.ExpertsRepository;
import com.nghiahd.server.service.ExpertsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ExpertsServiceImpl implements ExpertsService {
    private final ExpertsRepository expertsRepository;

    public ExpertsServiceImpl(ExpertsRepository expertsRepository) {
        this.expertsRepository = expertsRepository;
    }

    @Override
    public Experts saveExperts(Experts experts) {
        experts.setCreateDate(LocalDateTime.now());
        experts.setUpdateDate(LocalDateTime.now());
        return expertsRepository.save(experts);
    }

    @Override
    public Experts editExperts(Experts experts, UUID id) {
        experts.setUpdateDate(LocalDateTime.now());
        Optional<Experts> pro = expertsRepository.findById(id);
        if (pro.isPresent()) {
            return expertsRepository.save(experts);
        }
        return null;
    }

    @Override
    public int deleteExperts(UUID id) {
        return expertsRepository.deleteByExpertsID(id);
    }
}
