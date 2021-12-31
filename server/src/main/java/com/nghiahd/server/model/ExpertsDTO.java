package com.nghiahd.server.model;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class ExpertsDTO {

    private UUID id;
    private String code;
    private String fullname;
    private Boolean gender;
    private LocalDate birthDay;
    private Integer countryID;
    private String countryName;
    private String religion;
    private String occupation;
    private String permanentResidentialAddress;
    private String phoneNumber;
    private String passportNumber;
    private LocalDate expiryDate;
    private LocalDate dateOfEntry;
    private Integer lengthOfStay;
    private String passportImage;
    private String portraitPhotography;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public ExpertsDTO() {
    }
    public ExpertsDTO(UUID id,
                      String code,
                      String fullname,
                      Boolean gender,
                      LocalDate birthDay,
                      Integer countryID,
                      String countryName,
                      String religion,
                      String occupation,
                      String permanentResidentialAddress,
                      String phoneNumber,
                      String passportNumber,
                      LocalDate expiryDate,
                      LocalDate dateOfEntry,
                      Integer lengthOfStay,
                      String passportImage,
                      String portraitPhotography,
                      LocalDateTime createDate,
                      LocalDateTime updateDate) {
        this.id = id;
        this.code = code;
        this.fullname = fullname;
        this.gender = gender;
        this.birthDay = birthDay;
        this.countryID = countryID;
        this.countryName = countryName;
        this.religion = religion;
        this.occupation = occupation;
        this.permanentResidentialAddress = permanentResidentialAddress;
        this.phoneNumber = phoneNumber;
        this.passportNumber = passportNumber;
        this.expiryDate = expiryDate;
        this.dateOfEntry = dateOfEntry;
        this.lengthOfStay = lengthOfStay;
        this.passportImage = passportImage;
        this.portraitPhotography = portraitPhotography;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }
}
