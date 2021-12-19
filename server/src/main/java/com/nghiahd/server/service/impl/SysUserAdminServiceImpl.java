package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.SysUserAdmin;
import com.nghiahd.server.repository.SysUserAdminRepository;
import com.nghiahd.server.service.SysUserAdminService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
public class SysUserAdminServiceImpl implements SysUserAdminService {
    private final SysUserAdminRepository sysUserAdminRepository;

    public SysUserAdminServiceImpl(SysUserAdminRepository sysUserAdminRepository) {
        this.sysUserAdminRepository = sysUserAdminRepository;
    }

    @Override
    public Map<String, Object> getUserByUsernameAndPwd(String username) {
        return sysUserAdminRepository.getUserByUsernameAndPwd(username);
    }

    @Override
    public boolean checkUsernameIsExist(String username) {
        return sysUserAdminRepository.checkUsernameIsExist(username) == 1;
    }

    @Override
    public SysUserAdmin save(SysUserAdmin userAdmin) {
        return sysUserAdminRepository.save(userAdmin);
    }
}
