package com.nghiahd.server.repository;

import com.nghiahd.server.domain.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SysUserCustomerRepository extends JpaRepository<SysUser, Integer>, SysUserCustomerRepositoryCustom {
}
