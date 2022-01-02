package com.nghiahd.server.domain;

import com.nghiahd.server.model.ProfileDTO;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "taskfordepartment")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "ProfileListDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = ProfileDTO.class,
                                columns = {
                                        @ColumnResult(name = "id", type = UUID.class),
                                        @ColumnResult(name = "departmentID", type = UUID.class),
                                        @ColumnResult(name = "profileID", type = UUID.class),
                                        @ColumnResult(name = "description", type = String.class),
                                        @ColumnResult(name = "result", type = String.class),
                                        @ColumnResult(name = "expirationDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "createDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "departmentName", type = String.class),
                                        @ColumnResult(name = "profileCode", type = String.class),
                                        @ColumnResult(name = "statusProfileID", type = UUID.class),
                                        @ColumnResult(name = "statusProfileName", type = String.class),

                                }
                        )
                }
        ),
})
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
    private LocalDateTime expirationDate;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    public TaskForDepartment(UUID id, Integer departmentID, UUID profileID, String description, String result, LocalDateTime expirationDate, LocalDateTime createDate) {
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
}
