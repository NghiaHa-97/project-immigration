package com.nghiahd.server.repository;

import java.util.Map;

public interface SysUserAdminRepositoryCustom {
    Map<String, Object> getUserByUsernameAndPwd(String username);
    Integer checkUsernameIsExist(String username);
}
