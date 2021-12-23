package com.nghiahd.server.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "comment")
public class Comment {
    @Id
    private UUID id;

    @Column(name = "employeeid")
    private UUID employeeID;

    @Column(name = "profileid")
    private UUID profileID;

    @Column(name = "workunitid")
    private Integer workUnitID;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "reason")
    private String reason;

    public Comment() {
    }

    public Comment(UUID id, UUID employeeID, UUID profileID, Integer workUnitID, Boolean status, String reason) {
        this.id = id;
        this.employeeID = employeeID;
        this.profileID = profileID;
        this.workUnitID = workUnitID;
        this.status = status;
        this.reason = reason;
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

    public Integer getWorkUnitID() {
        return workUnitID;
    }

    public void setWorkUnitID(Integer workUnitID) {
        this.workUnitID = workUnitID;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
