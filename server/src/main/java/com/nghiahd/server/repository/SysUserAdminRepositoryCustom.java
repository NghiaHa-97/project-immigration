package com.nghiahd.server.repository;

import com.nghiahd.server.model.UserLogin;

import java.util.Map;

public interface SysUserAdminRepositoryCustom {
    UserLogin getUserByUsername(String username);
    Integer checkUsernameIsExist(String username);
}
