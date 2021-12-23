package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "communeward")
public class CommuneWard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "districtid")
    private Integer districtID;

    public CommuneWard() {
    }

    public CommuneWard(Integer id, String name, Integer districtID) {
        this.id = id;
        this.name = name;
        this.districtID = districtID;
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

    public Integer getDistrictID() {
        return districtID;
    }

    public void setDistrictID(Integer districtID) {
        this.districtID = districtID;
    }
}
