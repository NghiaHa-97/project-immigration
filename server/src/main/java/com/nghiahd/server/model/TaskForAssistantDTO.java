package com.nghiahd.server.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
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
}
