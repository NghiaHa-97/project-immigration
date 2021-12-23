package com.nghiahd.server.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PermissionRole that = (PermissionRole) o;
        return permissionID.equals(that.permissionID) && roleID.equals(that.roleID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(permissionID, roleID);
    }
}
