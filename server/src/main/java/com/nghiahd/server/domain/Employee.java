package com.nghiahd.server.domain;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    private UUID id;

    @Column(name = "code")
    private String code;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "birthDay")
    private LocalDate birthDay;

    @Column(name = "departmentid")
    private UUID departmentID;

    @Column(name = "positionid")
    private UUID positionID;

    @Column(name = "workunitid")
    private UUID workUnitID;

    @Column(name = "cityprovinceid")
    private Integer cityProvinceID;

    @Column(name = "districtid")
    private Integer districtID;

    @Column(name = "communewardid")
    private Integer communeWardID;

    @Column(name = "description")
    private String description;

    @Column(name = "phonenumber")
    private String phoneNumber;

    @Column(name = "numberidentitycard")
    private String numberIdentityCard;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    public Employee() {
    }

    public Employee(UUID id, String code, String fullname, String avatar, Boolean gender, LocalDate birthDay, UUID departmentID, UUID positionID, UUID workUnitID, Integer cityProvinceID, Integer districtID, Integer communeWardID, String description, String phoneNumber, String numberIdentityCard, LocalDateTime createDate, LocalDateTime updateDate) {
        this.id = id;
        this.code = code;
        this.fullname = fullname;
        this.avatar = avatar;
        this.gender = gender;
        this.birthDay = birthDay;
        this.departmentID = departmentID;
        this.positionID = positionID;
        this.workUnitID = workUnitID;
        this.cityProvinceID = cityProvinceID;
        this.districtID = districtID;
        this.communeWardID = communeWardID;
        this.description = description;
        this.phoneNumber = phoneNumber;
        this.numberIdentityCard = numberIdentityCard;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public LocalDate getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(LocalDate birthDay) {
        this.birthDay = birthDay;
    }

    public UUID getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(UUID departmentID) {
        this.departmentID = departmentID;
    }

    public UUID getPositionID() {
        return positionID;
    }

    public void setPositionID(UUID positionID) {
        this.positionID = positionID;
    }

    public UUID getWorkUnitID() {
        return workUnitID;
    }

    public void setWorkUnitID(UUID workUnitID) {
        this.workUnitID = workUnitID;
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getNumberIdentityCard() {
        return numberIdentityCard;
    }

    public void setNumberIdentityCard(String numberIdentityCard) {
        this.numberIdentityCard = numberIdentityCard;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }
}
