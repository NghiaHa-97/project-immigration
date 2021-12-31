package com.nghiahd.server.service;

import com.nghiahd.server.domain.CommuneWard;

import java.util.List;

public interface CommuneWardService {
    List<CommuneWard> getAllCommuneWard(int districtID);

}
