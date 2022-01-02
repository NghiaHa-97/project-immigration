package com.nghiahd.server.domain.custom;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "taskfordepartment")
@Getter
@Setter
public class TaskForDepartmentQuery {
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

    public TaskForDepartmentQuery() {
    }

    public TaskForDepartmentQuery(UUID id, Integer departmentID, UUID profileID, String description, String result, LocalDateTime expirationDate, LocalDateTime createDate) {
        this.id = id;
        this.departmentID = departmentID;
        this.profileID = profileID;
        this.description = description;
        this.result = result;
        this.expirationDate = expirationDate;
        this.createDate = createDate;
    }
}
