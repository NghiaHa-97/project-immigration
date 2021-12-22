package com.nghiahd.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nghiahd.server.domain.Module;
import com.nghiahd.server.domain.Permission;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class UserLogin {
    private Integer id;
    private String username;
    @JsonIgnore
    private String password;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private Integer roleID;
    private String roleName;
    private Set<Permission> permissionSet = new HashSet<>();
    private Set<Module> moduleSet = new HashSet<>();


    public UserLogin() {
    }

    public UserLogin(Integer id, String username, String password, LocalDateTime createDate, LocalDateTime updateDate, Integer roleID, String roleName,
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
        this.permissionSet.add(new Permission(null, permissionName, permissionCode, null));
        this.moduleSet.add(new Module(null, moduleName, moduleCode));
    }

    public void addPermissionSet(Set<Permission> p) {
        this.permissionSet.addAll(p);
    }

    public void addModuleSet(Set<Module> m) {
        this.moduleSet.addAll(m);
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Set<Permission> getPermissionSet() {
        return permissionSet;
    }

    public void setPermissionSet(Set<Permission> permissionSet) {
        this.permissionSet = permissionSet;
    }

    public Set<Module> getModuleSet() {
        return moduleSet;
    }

    public void setModuleSet(Set<Module> moduleSet) {
        this.moduleSet = moduleSet;
    }
}
