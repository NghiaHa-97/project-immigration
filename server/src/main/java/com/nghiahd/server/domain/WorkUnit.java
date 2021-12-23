package com.nghiahd.server.domain;

import javax.persistence.*;

@Entity
@Table(name = "workunit")
public class WorkUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "cityprovinceid")
    private Integer cityProvinceID;

    @Column(name = "districtid")
    private Integer districtID;

    @Column(name = "communewardid")
    private Integer communeWardID;

    @Column(name = "description")
    private String description;

    @Column(name = "unittypeid")
    private Integer unitTypeID;

    public WorkUnit() {
    }

    public WorkUnit(Integer id, String name, Double latitude, Double longitude, Integer cityProvinceID, Integer districtID, Integer communeWardID, String description, Integer unitTypeID) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cityProvinceID = cityProvinceID;
        this.districtID = districtID;
        this.communeWardID = communeWardID;
        this.description = description;
        this.unitTypeID = unitTypeID;
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getCityProvinceID() {
        return cityProvinceID;
    }

    public void setCityProvinceID(Integer cityProvinceID) {
        this.cityProvinceID = cityProvinceID;
    }

    public Integer getDistrictID() {
        return districtID;
    }

    public void setDistrictID(Integer districtID) {
        this.districtID = districtID;
    }

    public Integer getCommuneWardID() {
        return communeWardID;
    }

    public void setCommuneWardID(Integer communeWardID) {
        this.communeWardID = communeWardID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getUnitTypeID() {
        return unitTypeID;
    }

    public void setUnitTypeID(Integer unitTypeID) {
        this.unitTypeID = unitTypeID;
    }
}
