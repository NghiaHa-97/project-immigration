package com.nghiahd.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SysUserCustomerDTO {
    private Integer id;
    private String  username;
    private Boolean  isActive;
    private LocalDateTime createDate;
    private LocalDateTime  updateDate;
    private Integer  roleID;
    private String  roleName;
    private UUID employeeID;
    private String  employeeCode;
    private String  employeeFullName;

}
