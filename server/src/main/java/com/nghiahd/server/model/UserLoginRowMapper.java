package com.nghiahd.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nghiahd.server.domain.Module;
import com.nghiahd.server.domain.Permission;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

public class UserLoginRowMapper {
    private Integer id;
    private String username;
    @JsonIgnore
    private String password;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private Integer roleID;
    private String roleName;
    private Integer permissionCode;
    private String permissionName;
    private Integer moduleCode;
    private String moduleName;
    private Set<Permission> permissionSet;
    private Set<Module> moduleSet;

    public UserLoginRowMapper(int id,
                              String username,
                              String password,
                              LocalDateTime createDate,
                              LocalDateTime updateDate,
                              Integer roleID,
                              String roleName,
                              Integer permissionCode,
                              String permissionName,
                              Integer moduleCode,
                              String moduleName) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.roleID = roleID;
        this.roleName = roleName;
        this.permissionCode = permissionCode;
        this.permissionName = permissionName;
        this.moduleCode = moduleCode;
        this.moduleName = moduleName;
    }



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public Integer getRoleID() {
        return roleID;
    }

    public void setRoleID(Integer roleID) {
        this.roleID = roleID;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Integer getPermissionCode() {
        return permissionCode;
    }

    public void setPermissionCode(Integer permissionCode) {
        this.permissionCode = permissionCode;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public Integer getModuleCode() {
        return moduleCode;
    }

    public void setModuleCode(Integer moduleCode) {
        this.moduleCode = moduleCode;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    @Override
    public String toString() {
        return "UserLoginRowMapper{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                ", roleID=" + roleID +
                ", roleName='" + roleName + '\'' +
                ", permissionCode=" + permissionCode +
                ", permissionName='" + permissionName + '\'' +
                ", moduleCode=" + moduleCode +
                ", moduleName='" + moduleName + '\'' +
                '}';
    }
}
