package com.nghiahd.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nghiahd.server.domain.Module;
import com.nghiahd.server.domain.Permission;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

public class UserLogin {
    private Integer id;
    private String username;
    @JsonIgnore
    private String password;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private Integer roleID;
    private String roleName;
    //    private Set<Permission> permissionSet = new HashSet<>();
//    private Set<Module> moduleSet = new HashSet<>();
    private Map<Integer, Permission> permissionMap = null;
    private Map<Integer, Module> moduleMap = null;
    @JsonIgnore
    private Integer permissionCode;
    @JsonIgnore
    private String permissionName;
    @JsonIgnore
    private Integer moduleCode;
    @JsonIgnore
    private String moduleName;

    public void addItemToMapPermission(Integer code, String name) {
        if (this.permissionMap == null) {
            this.permissionMap = new HashMap<>();
            this.permissionMap.put(this.permissionCode, new Permission(this.permissionCode, this.permissionName));
        }
        if(!this.permissionMap.containsKey(code)){
            this.permissionMap.put(code, new Permission(code, name));
        }
    }

    public void addItemToMapModule(Integer code, String name) {
        if (this.moduleMap == null) {
            this.moduleMap = new HashMap<>();
            this.moduleMap.put(this.moduleCode, new Module(this.moduleCode, this.moduleName));
        }
        if(!this.moduleMap.containsKey(code)){
            this.moduleMap.put(code, new Module(code, name));
        }
    }

    public UserLogin() {
    }

//    public UserLogin(Integer id,
//                     String username,
//                     String password,
//                     LocalDateTime createDate,
//                     LocalDateTime updateDate,
//                     Integer roleID, String roleName,
//                     Integer permissionCode,
//                     String permissionName,
//                     Integer moduleCode,
//                     String moduleName) {
//        this.id = id;
//        this.username = username;
//        this.password = password;
//        this.createDate = createDate;
//        this.updateDate = updateDate;
//        this.roleID = roleID;
//        this.roleName = roleName;
//        this.permissionSet.add(new Permission(null, permissionName, permissionCode, null));
//        this.moduleSet.add(new Module(null, moduleName, moduleCode));
//    }

    public UserLogin(Integer id,
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

//    public void addPermissionSet(Set<Permission> p) {
//        this.permissionSet.addAll(p);
//    }
//
//    public void addModuleSet(Set<Module> m) {
//        this.moduleSet.addAll(m);
//    }

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

    public Map<Integer, Permission> getPermissionMap() {
        return permissionMap;
    }

    public void setPermissionMap(Map<Integer, Permission> permissionMap) {
        this.permissionMap = permissionMap;
    }

    public Map<Integer, Module> getModuleMap() {
        return moduleMap;
    }

    public void setModuleMap(Map<Integer, Module> moduleMap) {
        this.moduleMap = moduleMap;
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

    //    public Set<Permission> getPermissionSet() {
//        return permissionSet;
//    }
//
//    public void setPermissionSet(Set<Permission> permissionSet) {
//        this.permissionSet = permissionSet;
//    }
//
//    public Set<Module> getModuleSet() {
//        return moduleSet;
//    }
//
//    public void setModuleSet(Set<Module> moduleSet) {
//        this.moduleSet = moduleSet;
//    }
}
