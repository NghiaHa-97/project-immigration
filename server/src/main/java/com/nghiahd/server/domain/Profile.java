package com.nghiahd.server.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "profile")
public class Profile {

    @Id
    private UUID id;

    @Column(name = "code")
    private String code;

    @Column(name = "projectmissionid")
    private Integer projectMissionID;

    @Column(name = "workunitid")
    private Integer workUnitID;

    @Column(name = "departmentid")
    private Integer departmentID;

    @Column(name = "vehicleid")
    private Integer vehicleID;

    @Column(name = "statusprofileid")
    private Integer statusProfileID;

    @Column(name = "description")
    private String description;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    @Column(name = "expirationdate")
    private LocalDateTime expirationDate;

    public Profile() {
    }

    public Profile(UUID id, String code, Integer projectMissionID, Integer workUnitID, Integer departmentID, Integer vehicleID, Integer statusProfileID, String description, LocalDateTime createDate, LocalDateTime updateDate, LocalDateTime expirationDate) {
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
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getProjectMissionID() {
        return projectMissionID;
    }

    public void setProjectMissionID(Integer projectMissionID) {
        this.projectMissionID = projectMissionID;
    }

    public Integer getWorkUnitID() {
        return workUnitID;
    }

    public void setWorkUnitID(Integer workUnitID) {
        this.workUnitID = workUnitID;
    }

    public Integer getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(Integer departmentID) {
        this.departmentID = departmentID;
    }

    public Integer getVehicleID() {
        return vehicleID;
    }

    public void setVehicleID(Integer vehicleID) {
        this.vehicleID = vehicleID;
    }

    public Integer getStatusProfileID() {
        return statusProfileID;
    }

    public void setStatusProfileID(Integer statusProfileID) {
        this.statusProfileID = statusProfileID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }
}