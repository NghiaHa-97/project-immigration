package com.nghiahd.server.service;

import com.nghiahd.server.domain.Department;

import java.util.List;

public interface DepartmentService {
    List<Department> findDepartmentByWorkUnitID(int workUnitID);
}
