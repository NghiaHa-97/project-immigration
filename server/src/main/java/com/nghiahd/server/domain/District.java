package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "district")
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "cityprovinceid")
    private Integer cityProvinceID;

    public District() {
    }

    public District(Integer id, String name, Integer cityProvinceID) {
        this.id = id;
        this.name = name;
        this.cityProvinceID = cityProvinceID;
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

    public Integer getCityProvinceID() {
        return cityProvinceID;
    }

    public void setCityProvinceID(Integer cityProvinceID) {
        this.cityProvinceID = cityProvinceID;
    }
}
