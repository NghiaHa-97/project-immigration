package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.SysUserAdmin;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.repository.SysUserAdminRepository;
import com.nghiahd.server.repository.SysUserCustomerRepository;
import com.nghiahd.server.service.AuthService;
import com.nghiahd.server.service.SysUserCustomerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {
    private final SysUserAdminRepository sysUserAdminRepository;
    private final SysUserCustomerRepository sysUserCustomerRepository;

    public AuthServiceImpl(SysUserAdminRepository sysUserAdminRepository,
                           SysUserCustomerRepository sysUserCustomerRepository) {
        this.sysUserAdminRepository = sysUserAdminRepository;
        this.sysUserCustomerRepository = sysUserCustomerRepository;
    }

    @Override
    public UserLogin getUserAdminByUsername(String username) {
        return sysUserAdminRepository.getUserByUsername(username);
    }

    @Override
    public boolean checkUsernameAdminIsExist(String username) {
        return sysUserAdminRepository.checkUsernameIsExist(username) != 0;
    }

    @Override
    public SysUserAdmin saveAdmin(SysUserAdmin userAdmin) {
        return sysUserAdminRepository.save(userAdmin);
    }

    @Override
    public UserLogin getUserCustomerByUsername(String username) {
        return sysUserCustomerRepository.getUserByUsername(username);
    }

    @Override
    public boolean checkUsernameCustomerIsExist(String username) {
        return sysUserCustomerRepository.checkUsernameIsExist(username) != 0;
    }
}
