package com.nghiahd.server.service;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.Employee;
import com.nghiahd.server.model.EmployeeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface EmployeeService {
    Page<EmployeeDTO> getPageEmployee(Pageable pageable);

    Employee getDetailEmployee(UUID id);

    Employee createEmployee(Employee em, MultipartFile fileImage);

    Employee editEmployee(Employee employee, UUID id);

    ApiResponseCode deleteEmployee(UUID id);
}
