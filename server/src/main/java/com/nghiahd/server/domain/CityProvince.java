package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "cityprovince")
public class CityProvince {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    public CityProvince() {
    }

    public CityProvince(Integer id, String name) {
        this.id = id;
        this.name = name;
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
}
