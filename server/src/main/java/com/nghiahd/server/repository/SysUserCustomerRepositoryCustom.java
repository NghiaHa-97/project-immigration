package com.nghiahd.server.repository;

import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.model.UserLogin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SysUserCustomerRepositoryCustom {
    Page<SysUserCustomerDTO> customerDTOPage(Pageable pageable,
                                             String username,
                                             String employeeCode,
                                             String employeeFullName,
                                             String roleName);
    SysUserCustomerDTO findSysUserCustomerByID(Integer id);

    UserLogin getUserByUsername(String username);
}
