package com.nghiahd.server.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class TaskForDepartmentDTO {

    private UUID id;
    private Integer departmentID;
    private UUID profileID;
    private String description;
    private String result;
    private LocalDateTime expirationDate;
    private LocalDateTime createDate;
    private String departmentName;
    private String profileCode;
    private UUID statusProfileID;
    private String statusProfileName;

    public TaskForDepartmentDTO() {
    }

    public TaskForDepartmentDTO(UUID id, Integer departmentID, UUID profileID, String description, String result, LocalDateTime expirationDate, LocalDateTime createDate, String departmentName, String profileCode, UUID statusProfileID, String statusProfileName) {
        this.id = id;
        this.departmentID = departmentID;
        this.profileID = profileID;
        this.description = description;
        this.result = result;
        this.expirationDate = expirationDate;
        this.createDate = createDate;
        this.departmentName = departmentName;
        this.profileCode = profileCode;
        this.statusProfileID = statusProfileID;
        this.statusProfileName = statusProfileName;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Integer getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(Integer departmentID) {
        this.departmentID = departmentID;
    }

    public UUID getProfileID() {
        return profileID;
    }

    public void setProfileID(UUID profileID) {
        this.profileID = profileID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getProfileCode() {
        return profileCode;
    }

    public void setProfileCode(String profileCode) {
        this.profileCode = profileCode;
    }

    public UUID getStatusProfileID() {
        return statusProfileID;
    }

    public void setStatusProfileID(UUID statusProfileID) {
        this.statusProfileID = statusProfileID;
    }

    public String getStatusProfileName() {
        return statusProfileName;
    }

    public void setStatusProfileName(String statusProfileName) {
        this.statusProfileName = statusProfileName;
    }
}
