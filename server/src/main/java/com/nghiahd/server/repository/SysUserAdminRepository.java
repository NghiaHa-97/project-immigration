package com.nghiahd.server.repository;

import com.nghiahd.server.domain.SysUserAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SysUserAdminRepository extends JpaRepository<SysUserAdmin, Integer>, SysUserAdminRepositoryCustom {

}
