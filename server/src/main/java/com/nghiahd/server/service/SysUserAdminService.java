package com.nghiahd.server.service;

import com.nghiahd.server.domain.SysUserAdmin;
import com.nghiahd.server.model.UserLogin;


public interface SysUserAdminService {
    UserLogin getUserByUsername(String username);
    boolean checkUsernameIsExist(String username);
    SysUserAdmin save(SysUserAdmin userAdmin);
}
