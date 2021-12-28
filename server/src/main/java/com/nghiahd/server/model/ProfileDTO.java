package com.nghiahd.server.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class ProfileDTO {

    private UUID id;
    private String code;
    private Integer projectMissionID;
    private Integer workUnitID;
    private Integer departmentID;
    private Integer vehicleID;
    private Integer statusProfileID;
    private String description;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private LocalDateTime expirationDate;
    private String expertsCode;
    private String expertsFullName;
    private String projectMissionName;
    private String workUnitName;
    private String departmentName;
    private String vehicleName;
    private String statusProfileName;

    public ProfileDTO() {
    }

    public ProfileDTO(UUID id, String code, Integer projectMissionID, Integer workUnitID, Integer departmentID, Integer vehicleID, Integer statusProfileID, String description, LocalDateTime createDate, LocalDateTime updateDate, LocalDateTime expirationDate, String expertsCode, String expertsFullName, String projectMissionName, String workUnitName, String departmentName, String vehicleName, String statusProfileName) {
        this.id = id;
        this.code = code;
        this.projectMissionID = projectMissionID;
        this.workUnitID = workUnitID;
        this.departmentID = departmentID;
        this.vehicleID = vehicleID;
        this.statusProfileID = statusProfileID;
        this.description = description;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.expirationDate = expirationDate;
        this.expertsCode = expertsCode;
        this.expertsFullName = expertsFullName;
        this.projectMissionName = projectMissionName;
        this.workUnitName = workUnitName;
        this.departmentName = departmentName;
        this.vehicleName = vehicleName;
        this.statusProfileName = statusProfileName;
    }
}
