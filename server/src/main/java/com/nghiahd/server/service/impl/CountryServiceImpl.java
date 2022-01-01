package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.Country;
import com.nghiahd.server.repository.CountryRepository;
import com.nghiahd.server.service.CountryService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> getAllCountry() {
        return countryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
