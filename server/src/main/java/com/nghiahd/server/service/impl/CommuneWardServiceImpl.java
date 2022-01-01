package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.CommuneWard;
import com.nghiahd.server.repository.CommuneWardRepository;
import com.nghiahd.server.service.CommuneWardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommuneWardServiceImpl implements CommuneWardService {
    private final CommuneWardRepository communeWardRepository;

    public CommuneWardServiceImpl(CommuneWardRepository communeWardRepository) {
        this.communeWardRepository = communeWardRepository;
    }

    @Override
    public List<CommuneWard> getAllCommuneWard(int districtID) {
        return communeWardRepository.findByDistrictIDOrderByNameAsc(districtID);
    }
}
