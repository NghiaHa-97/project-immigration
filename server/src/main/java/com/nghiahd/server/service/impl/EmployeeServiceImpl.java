package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.Employee;
import com.nghiahd.server.model.EmployeeDTO;
import com.nghiahd.server.repository.EmployeeRepository;
import com.nghiahd.server.service.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Page<EmployeeDTO> getPageEmployee(Pageable pageable) {
        return employeeRepository.getPageEmployee(pageable);
    }

    @Override
    public Employee getDetailEmployee(UUID id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Employee createEmployee(Employee em) {
        em.setCreateDate(LocalDateTime.now());
        em.setUpdateDate(LocalDateTime.now());
        return employeeRepository.save(em);
    }

    @Override
    public Employee editEmployee(Employee employee, UUID id) {
        employee.setUpdateDate(LocalDateTime.now());
        Optional<Employee> pro = employeeRepository.findById(id);
        if (pro.isPresent()) {
            return employeeRepository.save(employee);
        }
        return null;
    }

    @Override
    public ApiResponseCode deleteEmployee(UUID id) {
        if (employeeRepository.checkExistEmployeeInProfile(id) > 0) {
            return ApiResponseCode.EXIST_RELATION;
        }
        employeeRepository.deleteById(id);
        return ApiResponseCode.SUCCESS;
    }
}
