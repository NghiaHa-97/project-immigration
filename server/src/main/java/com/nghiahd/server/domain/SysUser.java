package com.nghiahd.server.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "sysuser")
public class SysUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "employeeid")
    private UUID employeeID;

    @Column(name = "isactive")
    private Boolean isActive;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    @Column(name = "roleid")
    private Integer roleID;

    public SysUser() {
    }

    public SysUser(Integer id, String username, String password, UUID employeeID, Boolean isActive, LocalDateTime createDate, LocalDateTime updateDate, Integer roleID) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.employeeID = employeeID;
        this.isActive = isActive;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.roleID = roleID;
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

    public UUID getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(UUID employeeID) {
        this.employeeID = employeeID;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
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
}
