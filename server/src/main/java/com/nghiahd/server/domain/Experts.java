package com.nghiahd.server.domain;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "experts")
public class Experts {
    @Id
    private UUID id;

    @Column(name = "code")
    private String code;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "birthday")
    private LocalDate birthDay;

    @Column(name = "countryid")
    private Integer countryID;

    @Column(name = "religion")
    private String religion;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "permanentresidentialaddress")
    private String permanentResidentialAddress;


    @Column(name = "phonenumber")
    private String phoneNumber;

    @Column(name = "passportnumber")
    private String passportNumber;


    @Column(name = "expirydate")
    private LocalDate expiryDate;

    @Column(name = "dateofentry")
    private LocalDate dateOfEntry;

    @Column(name = "lengthofstay")
    private Integer lengthOfStay;

    @Column(name = "passportimage")
    private String passportImage;

    @Column(name = "portraitphotography")
    private String portraitPhotography;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    public Experts() {
    }

    public Experts(UUID id, String code, String fullname, Boolean gender, LocalDate birthDay, Integer countryID, String religion, String occupation, String permanentResidentialAddress, String phoneNumber, String passportNumber, LocalDate expiryDate, LocalDate dateOfEntry, Integer lengthOfStay, String passportImage, String portraitPhotography, LocalDateTime createDate, LocalDateTime updateDate) {
        this.id = id;
        this.code = code;
        this.fullname = fullname;
        this.gender = gender;
        this.birthDay = birthDay;
        this.countryID = countryID;
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

    public Integer getCountryID() {
        return countryID;
    }

    public void setCountryID(Integer countryID) {
        this.countryID = countryID;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getPermanentResidentialAddress() {
        return permanentResidentialAddress;
    }

    public void setPermanentResidentialAddress(String permanentResidentialAddress) {
        this.permanentResidentialAddress = permanentResidentialAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public LocalDate getDateOfEntry() {
        return dateOfEntry;
    }

    public void setDateOfEntry(LocalDate dateOfEntry) {
        this.dateOfEntry = dateOfEntry;
    }

    public Integer getLengthOfStay() {
        return lengthOfStay;
    }

    public void setLengthOfStay(Integer lengthOfStay) {
        this.lengthOfStay = lengthOfStay;
    }

    public String getPassportImage() {
        return passportImage;
    }

    public void setPassportImage(String passportImage) {
        this.passportImage = passportImage;
    }

    public String getPortraitPhotography() {
        return portraitPhotography;
    }

    public void setPortraitPhotography(String portraitPhotography) {
        this.portraitPhotography = portraitPhotography;
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
