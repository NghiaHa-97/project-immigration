package com.nghiahd.server.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class TaskForAssistantDTO {
    private UUID id;
    private UUID employeeID;
    private UUID profileID;
    private String description;
    private String result;
    private LocalDateTime expirationDate;
    private LocalDateTime createDate;
    private String employeeCode;
    private String employeeFullName;
    private String profileCode;
    private UUID statusProfileID;
    private String statusProfileName;

    public TaskForAssistantDTO() {
    }

    public TaskForAssistantDTO(UUID id, UUID employeeID, UUID profileID, String description, String result, LocalDateTime expirationDate, LocalDateTime createDate, String employeeCode, String employeeFullName, String profileCode, UUID statusProfileID, String statusProfileName) {
        this.id = id;
        this.employeeID = employeeID;
        this.profileID = profileID;
        this.description = description;
        this.result = result;
        this.expirationDate = expirationDate;
        this.createDate = createDate;
        this.employeeCode = employeeCode;
        this.employeeFullName = employeeFullName;
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

    public UUID getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(UUID employeeID) {
        this.employeeID = employeeID;
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

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getEmployeeFullName() {
        return employeeFullName;
    }

    public void setEmployeeFullName(String employeeFullName) {
        this.employeeFullName = employeeFullName;
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
