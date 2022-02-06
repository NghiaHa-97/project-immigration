package com.nghiahd.server.repository;

import com.nghiahd.server.domain.SysUserAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface SysUserAdminRepository extends JpaRepository<SysUserAdmin, Integer>, SysUserAdminRepositoryCustom {

    @Query(value = "select count(1) from SysUserAdmin where Username = ?1 ", nativeQuery = true)
    int checkUsernameIsExist(String username);

}
