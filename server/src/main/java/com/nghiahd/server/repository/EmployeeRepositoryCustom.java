package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Employee;
import com.nghiahd.server.model.EmployeeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeRepositoryCustom {
    Page<EmployeeDTO> getPageEmployee(Pageable pageable,
                                      String code,
                                      String fullname,
                                      String workUnitName,
                                      String cityProvinceName,
                                      String phoneNumber,
                                      String numberIdentityCard);
    void refresh(Employee e);
}
