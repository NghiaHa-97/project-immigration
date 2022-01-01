package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.District;
import com.nghiahd.server.repository.DistrictRepository;
import com.nghiahd.server.service.DistrictService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DistrictServiceImpl implements DistrictService {
    private final DistrictRepository districtRepository;

    public DistrictServiceImpl(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    @Override
    public List<District> getAllDistrict(int cityProvinceID) {
        return districtRepository.findByCityProvinceIDOrderByNameAsc(cityProvinceID);
    }
}
