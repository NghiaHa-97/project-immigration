package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.Role;
import com.nghiahd.server.domain.custom.RoleQuery;
import com.nghiahd.server.repository.RoleQueryRepository;
import com.nghiahd.server.repository.RoleRepository;
import com.nghiahd.server.service.RoleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
    private final RoleQueryRepository roleQueryRepository;
    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleQueryRepository roleQueryRepository,
                           RoleRepository roleRepository) {
        this.roleQueryRepository = roleQueryRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> getAllRole() {
        return this.roleRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public RoleQuery getDetailRoleByID(int roleID) {
        return this.roleQueryRepository.findById(roleID).orElse(null);
    }

    @Override
    public RoleQuery saveRoleAndPermissionRole(RoleQuery roleQuery, Integer id) {
        if (id == null && this.roleRepository.checkExistRoleName(roleQuery.getName()) > 0) {
            return null;
        }
        return this.roleQueryRepository.save(roleQuery);
    }

    @Override
    public ApiResponseCode deleteRoleAndPermissionRole(int roleID) {
        if (this.roleRepository.checkExistRoleInUser(roleID) > 0) {
            return ApiResponseCode.EXIST_RELATION;
        }
        this.roleQueryRepository.deleteById(roleID);
        return ApiResponseCode.SUCCESS;
    }

    @Override
    public Page<Role> getPageRole(Pageable pageable) {
        return roleRepository.getPageRole(pageable);
    }
}
