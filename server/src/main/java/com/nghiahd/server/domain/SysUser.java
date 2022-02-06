package com.nghiahd.server.domain;

import com.nghiahd.server.model.EmployeeDTO;
import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.model.UserLoginRowMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sysuser")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "SysUserCustomerListDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = SysUserCustomerDTO.class,
                                columns = {
                                        @ColumnResult(name = "id", type = Integer.class),
                                        @ColumnResult(name = "username", type = String.class),
                                        @ColumnResult(name = "isActive", type = Boolean.class),
                                        @ColumnResult(name = "createDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "updateDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "roleID", type = Integer.class),
                                        @ColumnResult(name = "roleName", type = String.class),
                                        @ColumnResult(name = "employeeID", type = UUID.class),
                                        @ColumnResult(name = "employeeCode", type = String.class),
                                        @ColumnResult(name = "employeeFullName", type = String.class),
                                }
                        )
                }
        ),
        @SqlResultSetMapping(
                name = "UserLoginRowMapperCustomer",
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
                                        @ColumnResult(name = "isActive", type = Boolean.class),
                                        @ColumnResult(name = "employeeID", type = UUID.class),
                                        @ColumnResult(name = "workUnitID", type = Integer.class),
                                        @ColumnResult(name = "unitTypeID", type = Integer.class),
                                }
                        )
                }
        ),
})
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
}
