package com.nghiahd.server.service;

import com.nghiahd.server.domain.Position;

import java.util.List;

public interface PositionService {
    List<Position> findPositionByDepartmentID(int departmentID);
}
