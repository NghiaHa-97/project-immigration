package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.Position;
import com.nghiahd.server.repository.PositionRepository;
import com.nghiahd.server.service.PositionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PositionServiceImpl implements PositionService {
    private final PositionRepository positionRepository;

    public PositionServiceImpl(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    @Override
    public List<Position> findPositionByDepartmentID(int departmentID) {
        return positionRepository.findPositionByDepartmentID(departmentID);
    }
}
