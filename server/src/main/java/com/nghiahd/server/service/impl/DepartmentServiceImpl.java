package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.Department;
import com.nghiahd.server.repository.DepartmentRepository;
import com.nghiahd.server.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<Department> findDepartmentByWorkUnitID(int workUnitID) {
        return this.departmentRepository.findDepartmentByWorkUnitID(workUnitID);
    }
}
