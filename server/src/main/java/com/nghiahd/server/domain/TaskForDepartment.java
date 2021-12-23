package com.nghiahd.server.domain;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "taskfordepartment")
public class TaskForDepartment {

    @Id
    private UUID id;

    @Column(name = "departmentid")
    private Integer departmentID;

    @Column(name = "profileid")
    private UUID profileID;

    @Column(name = "description")
    private String description;

    @Column(name = "result")
    private String result;

    @Column(name = "expirationdate")
    private LocalDate expirationDate;

    @Column(name = "createdate")
    private LocalDate createDate;

    public TaskForDepartment(UUID id, Integer departmentID, UUID profileID, String description, String result, LocalDate expirationDate, LocalDate createDate) {
        this.id = id;
        this.departmentID = departmentID;
        this.profileID = profileID;
        this.description = description;
        this.result = result;
        this.expirationDate = expirationDate;
        this.createDate = createDate;
    }

    public TaskForDepartment() {
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

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }
}
