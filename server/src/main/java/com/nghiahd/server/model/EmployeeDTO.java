package com.nghiahd.server.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class EmployeeDTO {
    private UUID id;

    private String code;

    private String fullname;

    private String avatar;

    private Boolean gender;

    private LocalDate birthDay;

    private Integer departmentID;
    private String departmentName;

    private Integer positionID;
    private String positionName;

    private Integer workUnitID;
    private String workUnitName;

    private Integer cityProvinceID;
    private String cityProvinceName;

    private Integer districtID;
    private String districtName;

    private Integer communeWardID;
    private String communeWardName;

    private String description;

    private String phoneNumber;

    private String numberIdentityCard;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

    public EmployeeDTO() {
    }

    public EmployeeDTO(UUID id,
                       String code,
                       String fullname,
                       String avatar,
                       Boolean gender,
                       LocalDate birthDay,

                       Integer departmentID,
                       String departmentName,
                       Integer positionID,
                       String positionName,
                       Integer workUnitID,
                       String workUnitName,

                       Integer cityProvinceID,
                       String cityProvinceName,
                       Integer districtID,
                       String districtName,
                       Integer communeWardID,
                       String communeWardName,
                       String description,
                       String phoneNumber,
                       String numberIdentityCard,
                       LocalDateTime createDate,
                       LocalDateTime updateDate) {
        this.id = id;
        this.code = code;
        this.fullname = fullname;
        this.avatar = avatar;
        this.gender = gender;
        this.birthDay = birthDay;
        this.departmentID = departmentID;
        this.departmentName = departmentName;
        this.positionID = positionID;
        this.positionName = positionName;
        this.workUnitID = workUnitID;
        this.workUnitName = workUnitName;
        this.cityProvinceID = cityProvinceID;
        this.cityProvinceName = cityProvinceName;
        this.districtID = districtID;
        this.districtName = districtName;
        this.communeWardID = communeWardID;
        this.communeWardName = communeWardName;
        this.description = description;
        this.phoneNumber = phoneNumber;
        this.numberIdentityCard = numberIdentityCard;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }
}
