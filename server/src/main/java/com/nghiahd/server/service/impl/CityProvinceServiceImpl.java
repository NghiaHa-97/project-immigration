package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.CityProvince;
import com.nghiahd.server.repository.CityProvinceRepository;
import com.nghiahd.server.service.CityProvinceService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CityProvinceServiceImpl implements CityProvinceService {
    private final CityProvinceRepository cityProvinceRepository;

    public CityProvinceServiceImpl(CityProvinceRepository cityProvinceRepository) {
        this.cityProvinceRepository = cityProvinceRepository;
    }

    @Override
    public List<CityProvince> getAllCityProvince() {
        return cityProvinceRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
