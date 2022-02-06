package com.nghiahd.server.service;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.SysUser;
import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.model.UserLogin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SysUserCustomerService {
    Page<SysUserCustomerDTO> getPageSysUserCustomer(Pageable pageable,
                                                    String username,
                                                    String employeeCode,
                                                    String employeeFullName,
                                                    String roleName);

    SysUserCustomerDTO getDetailByID(Integer id);

    SysUser save(Integer id, SysUser sysUser);

    ApiResponseCode delete(Integer id);

//    UserLogin getUserByUsername(String username);
//    boolean checkUsernameIsExist(String username);;
}
