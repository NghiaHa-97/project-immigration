package com.nghiahd.server.domain;

import javax.persistence.*;

@Entity
@Table(name = "department")
public class Department {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "workunitid")
    private Integer workUnitID;

    public Department() {
    }

    public Department(Integer id, String name, Integer workUnitID) {
        this.id = id;
        this.name = name;
        this.workUnitID = workUnitID;
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

    public Integer getWorkUnitID() {
        return workUnitID;
    }

    public void setWorkUnitID(Integer workUnitID) {
        this.workUnitID = workUnitID;
    }
}
