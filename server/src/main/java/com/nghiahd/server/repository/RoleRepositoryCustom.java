package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoleRepositoryCustom {

    Page<Role> getPageRole(Pageable pageable, String name);
}
