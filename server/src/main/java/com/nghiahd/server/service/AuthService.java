package com.nghiahd.server.service;

import com.nghiahd.server.domain.SysUserAdmin;
import com.nghiahd.server.model.UserLogin;

public interface AuthService {
    UserLogin getUserAdminByUsername(String username);
    boolean checkUsernameAdminIsExist(String username);
    SysUserAdmin saveAdmin(SysUserAdmin userAdmin);

    UserLogin getUserCustomerByUsername(String username);
    boolean checkUsernameCustomerIsExist(String username);;
}
