package com.nghiahd.server.domain;

import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.model.UserLoginRowMapper;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "sysuseradmin")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "UserLoginRowMapperAdmin",
                classes = {
                        @ConstructorResult(
                                targetClass = UserLoginRowMapper.class,
                                columns = {
                                        @ColumnResult(name = "id", type = Integer.class),
                                        @ColumnResult(name = "username", type = String.class),
                                        @ColumnResult(name = "password", type = String.class),
                                        @ColumnResult(name = "createDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "updateDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "roleID", type = Integer.class),
                                        @ColumnResult(name = "roleName", type = String.class),
                                        @ColumnResult(name = "permissionCode", type = Integer.class),
                                        @ColumnResult(name = "permissionName", type = String.class),
                                        @ColumnResult(name = "moduleCode", type = Integer.class),
                                        @ColumnResult(name = "moduleName", type = String.class),
                                }
                        )
                }
        ),
})
public class SysUserAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    @Column(name = "roleid")
    private Integer roleID;

    public SysUserAdmin() {
    }

    public SysUserAdmin(Integer id, String username, String password, LocalDateTime createDate, LocalDateTime updateDate, Integer roleID) {
        this.id = id;
        this.username = username;
        this.password = password;
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
