package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.SysUser;
import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.repository.SysUserCustomerRepository;
import com.nghiahd.server.service.SysUserCustomerService;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class SysUserCustomerServiceImpl implements SysUserCustomerService {
    private final SysUserCustomerRepository sysUserCustomerRepository;
    private final PasswordEncoder passwordEncoder;

    public SysUserCustomerServiceImpl(SysUserCustomerRepository sysUserCustomerRepository,
                                      PasswordEncoder passwordEncoder) {
        this.sysUserCustomerRepository = sysUserCustomerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Page<SysUserCustomerDTO> getPageSysUserCustomer(Pageable pageable,
                                                           String username,
                                                           String employeeCode,
                                                           String employeeFullName,
                                                           String roleName) {
        return this.sysUserCustomerRepository.customerDTOPage(
                pageable,
                username,
                employeeCode,
                employeeFullName,
                roleName
        );
    }

    @Override
    public SysUserCustomerDTO getDetailByID(Integer id) {
        return this.sysUserCustomerRepository.findSysUserCustomerByID(id);
    }

    @Override
    public SysUser save(Integer id, SysUser sysUser) {
        if (id == null) {
            sysUser.setCreateDate(LocalDateTime.now());
        }
        if (id == null || Strings.isNotEmpty(sysUser.getPassword())) {
            sysUser.setPassword(this.passwordEncoder.encode(sysUser.getPassword()));
        }

        sysUser.setUpdateDate(LocalDateTime.now());
        return this.sysUserCustomerRepository.save(sysUser);
    }

    @Override
    public ApiResponseCode delete(Integer id) {
        this.sysUserCustomerRepository.deleteById(id);
        return ApiResponseCode.SUCCESS;
    }

//    @Override
//    public UserLogin getUserByUsername(String username) {
//        return sysUserCustomerRepository.getUserByUsername(username);
//    }
//
//    @Override
//    public boolean checkUsernameIsExist(String username) {
//        return sysUserCustomerRepository.checkUsernameIsExist(username) != 0;
//    }
}
