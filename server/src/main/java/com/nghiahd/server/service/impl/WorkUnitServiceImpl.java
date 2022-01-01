package com.nghiahd.server.service.impl;

import com.nghiahd.server.repository.WorkUnitRepository;
import com.nghiahd.server.service.WorkUnitService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WorkUnitServiceImpl implements WorkUnitService {
    private final WorkUnitRepository workUnitRepository;

    public WorkUnitServiceImpl(WorkUnitRepository workUnitRepository) {
        this.workUnitRepository = workUnitRepository;
    }

    @Override
    public List<Map<String, Object>> findWorkUnitWithUnitTypeID(int unitTypeID) {
        return workUnitRepository.findWorkUnitWithUnitTypeID(unitTypeID);
    }
}
