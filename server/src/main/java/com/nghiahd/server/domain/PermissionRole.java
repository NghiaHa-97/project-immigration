package com.nghiahd.server.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "permissionrole")
public class PermissionRole implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "permissionid")
    private Integer permissionID;

    @Id
    @Column(name = "roleid")
    private Integer roleID;

    public PermissionRole() {
    }

    public PermissionRole(Integer permissionID, Integer roleID) {
        this.permissionID = permissionID;
        this.roleID = roleID;
    }

    public Integer getPermissionID() {
        return permissionID;
    }

    public void setPermissionID(Integer permissionID) {
        this.permissionID = permissionID;
    }

    public Integer getRoleID() {
        return roleID;
    }

    public void setRoleID(Integer roleID) {
        this.roleID = roleID;
    }
}
