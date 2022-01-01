package com.nghiahd.server.domain;

import javax.persistence.*;

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

    public ProjectMission() {
    }

    public ProjectMission(Integer id, String name, String description, Integer workUnitCreateID) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.workUnitCreateID = workUnitCreateID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getWorkUnitCreateID() {
        return workUnitCreateID;
    }

    public void setWorkUnitCreateID(Integer workUnitCreateID) {
        this.workUnitCreateID = workUnitCreateID;
    }
}
