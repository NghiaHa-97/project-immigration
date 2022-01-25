package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.custom.ModuleQuery;
import com.nghiahd.server.repository.ModuleQueryRepository;
import com.nghiahd.server.service.ModuleService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {
    private final ModuleQueryRepository moduleQueryRepository;

    public ModuleServiceImpl(ModuleQueryRepository moduleQueryRepository) {
        this.moduleQueryRepository = moduleQueryRepository;
    }

    @Override
    public List<ModuleQuery> getAllModule() {
        return this.moduleQueryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
