package com.nghiahd.server.service;

import com.nghiahd.server.domain.District;

import java.util.List;

public interface DistrictService {
    List<District> getAllDistrict(int cityProvinceID);

}
