package com.nghiahd.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "projectmission")
public class ProjectMission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "workunitcreateid")
    private Integer workUnitCreateID;

    @Column(name = "employeeid")
    private UUID employeeID;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    public ProjectMission() {
    }

    public ProjectMission(Integer id, String name, String description, Integer workUnitCreateID) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.workUnitCreateID = workUnitCreateID;
    }
}
