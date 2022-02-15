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
public class AssignTasksDTO {
    private UUID id;
    private String title;
    private UUID employeeID;
    private String employeeFullname;
    private String employeeCode;
    private Integer departmentID;
    private String departmentName;
    private UUID profileID;
    private String profileCode;
    private String projectMissionName;

    private LocalDateTime expirationDate;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private Integer statusProfileID;
    private String statusProfileName;

    private UUID employeeCreateID;
    private String employeeCreateFullName;
    private String employeeCreateCode;

    private String description;
    private String result;

}
