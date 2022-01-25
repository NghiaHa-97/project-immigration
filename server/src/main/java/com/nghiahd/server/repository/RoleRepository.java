package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface RoleRepository extends JpaRepository<Role, Integer>, RoleRepositoryCustom {
    @Query(value = "select (select count(1)   " +
            "        from SysUser sysUser  " +
            "        WHERE sysUser.RoleID = ?1) +  " +
            "       (select count(1)   " +
            "        FROM SysUserAdmin sysUserAdmin  " +
            "        WHERE sysUserAdmin.RoleID = ?1) ", nativeQuery = true)
    int checkExistRoleInUser(int id);

    @Query(value = " select count(1) from Role where Name like ?1 ", nativeQuery = true)
    int checkExistRoleName(String roleName);

}
