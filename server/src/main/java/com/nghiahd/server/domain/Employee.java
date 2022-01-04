package com.nghiahd.server.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nghiahd.server.common.mapper.LocalDateDeserializer;
import com.nghiahd.server.common.mapper.LocalDateSerializer;
import com.nghiahd.server.common.mapper.LocalDateTimeDeserializer;
import com.nghiahd.server.common.mapper.LocalDateTimeSerializer;
import com.nghiahd.server.model.EmployeeDTO;
import com.nghiahd.server.model.ExpertsDTO;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "employee")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "EmployeeListDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = EmployeeDTO.class,
                                columns = {
                                        @ColumnResult(name = "id", type = UUID.class),
                                        @ColumnResult(name = "code", type = String.class),
                                        @ColumnResult(name = "fullname", type = String.class),
                                        @ColumnResult(name = "avatar", type = String.class),
                                        @ColumnResult(name = "gender", type = Boolean.class),
                                        @ColumnResult(name = "birthDay", type = LocalDate.class),
                                        @ColumnResult(name = "departmentID", type = Integer.class),
                                        @ColumnResult(name = "departmentName", type = String.class),
                                        @ColumnResult(name = "positionID", type = Integer.class),
                                        @ColumnResult(name = "positionName", type = String.class),
                                        @ColumnResult(name = "workUnitID", type = Integer.class),
                                        @ColumnResult(name = "workUnitName", type = String.class),
                                        @ColumnResult(name = "cityProvinceID", type = Integer.class),
                                        @ColumnResult(name = "cityProvinceName", type = String.class),
                                        @ColumnResult(name = "districtID", type = Integer.class),
                                        @ColumnResult(name = "districtName", type = String.class),
                                        @ColumnResult(name = "communeWardID", type = Integer.class),
                                        @ColumnResult(name = "communeWardName", type = String.class),
                                        @ColumnResult(name = "description", type = String.class),
                                        @ColumnResult(name = "phoneNumber", type = String.class),
                                        @ColumnResult(name = "numberIdentityCard", type = String.class),
                                        @ColumnResult(name = "createDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "updateDate", type = LocalDateTime.class),

                                }
                        )
                }
        ),
})
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

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "birthday")
    private LocalDate birthDay;

    @Column(name = "departmentid")
    private Integer departmentID;

    @Column(name = "positionid")
    private Integer positionID;

    @Column(name = "workunitid")
    private Integer workUnitID;

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

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "createdate")
    private LocalDateTime createDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    public Employee() {
    }

    public Employee(UUID id, String code, String fullname, String avatar, Boolean gender, LocalDate birthDay, Integer departmentID, Integer positionID, Integer workUnitID, Integer cityProvinceID, Integer districtID, Integer communeWardID, String description, String phoneNumber, String numberIdentityCard, LocalDateTime createDate, LocalDateTime updateDate) {
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

    public Integer getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(Integer departmentID) {
        this.departmentID = departmentID;
    }

    public Integer getPositionID() {
        return positionID;
    }

    public void setPositionID(Integer positionID) {
        this.positionID = positionID;
    }

    public Integer getWorkUnitID() {
        return workUnitID;
    }

    public void setWorkUnitID(Integer workUnitID) {
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
