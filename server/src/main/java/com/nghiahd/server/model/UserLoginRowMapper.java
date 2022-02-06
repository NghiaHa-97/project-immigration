package com.nghiahd.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nghiahd.server.domain.Module;
import com.nghiahd.server.domain.Permission;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
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
    private Boolean isActive;
    private UUID employeeID;
    private Integer workUnitID;
    private Integer unitTypeID;
    private Set<Permission> permissionSet;
    private Set<Module> moduleSet;

    //admin
    public UserLoginRowMapper(Integer id,
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

    //customer
    public UserLoginRowMapper(Integer id,
                              String username,
                              String password,
                              LocalDateTime createDate,
                              LocalDateTime updateDate,
                              Integer roleID,
                              String roleName,
                              Integer permissionCode,
                              String permissionName,
                              Integer moduleCode,
                              String moduleName,
                              Boolean isActive,
                              UUID employeeID,
                              Integer workUnitID,
                              Integer unitTypeID
                              ) {
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
        this.isActive = isActive;
        this.employeeID = employeeID;
        this.workUnitID = workUnitID;
        this.unitTypeID = unitTypeID;
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
