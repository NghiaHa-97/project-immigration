package com.nghiahd.server.repository;

import com.nghiahd.server.domain.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SysUserCustomerRepository extends JpaRepository<SysUser, Integer>, SysUserCustomerRepositoryCustom {
    @Query(value = "select count(1) from SysUser where Username = ?1 ", nativeQuery = true)
    int checkUsernameIsExist(String username);
}
