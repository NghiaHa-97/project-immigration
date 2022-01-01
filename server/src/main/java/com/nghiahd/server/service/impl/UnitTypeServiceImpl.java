package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.UnitType;
import com.nghiahd.server.repository.UnitTypeRepository;
import com.nghiahd.server.service.UnitTypeService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UnitTypeServiceImpl implements UnitTypeService {

    private final UnitTypeRepository unitTypeRepository;

    public UnitTypeServiceImpl(UnitTypeRepository unitTypeRepository) {
        this.unitTypeRepository = unitTypeRepository;
    }

    @Override
    public List<UnitType> getAllUnitType() {
        return unitTypeRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }
}
