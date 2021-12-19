package com.nghiahd.server.service;

import com.nghiahd.server.domain.SysUserAdmin;

import java.util.Map;

public interface SysUserAdminService {
    Map<String, Object> getUserByUsernameAndPwd(String username);
    boolean checkUsernameIsExist(String username);
    SysUserAdmin save(SysUserAdmin userAdmin);
}
