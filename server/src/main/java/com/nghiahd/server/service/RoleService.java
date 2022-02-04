package com.nghiahd.server.service;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.Role;
import com.nghiahd.server.domain.custom.RoleQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoleService {
     List<Role> getAllRole();
     RoleQuery getDetailRoleByID(int RoleID);
     RoleQuery saveRoleAndPermissionRole(RoleQuery roleQuery, Integer id);
     ApiResponseCode deleteRoleAndPermissionRole(int roleID);

    Page<Role> getPageRole(Pageable pageable, String name);
}
