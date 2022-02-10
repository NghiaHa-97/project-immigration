package com.nghiahd.server.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nghiahd.server.common.mapper.LocalDateDeserializer;
import com.nghiahd.server.common.mapper.LocalDateSerializer;
import com.nghiahd.server.common.mapper.LocalDateTimeDeserializer;
import com.nghiahd.server.common.mapper.LocalDateTimeSerializer;
import com.nghiahd.server.model.ExpertsDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "experts")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "ExpertsListDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = ExpertsDTO.class,
                                columns = {
                                        @ColumnResult(name = "id", type = UUID.class),
                                        @ColumnResult(name = "code", type = String.class),
                                        @ColumnResult(name = "fullname", type = String.class),
                                        @ColumnResult(name = "gender", type = Boolean.class),
                                        @ColumnResult(name = "birthDay", type = LocalDate.class),
                                        @ColumnResult(name = "countryID", type = Integer.class),
                                        @ColumnResult(name = "countryName", type = String.class),
                                        @ColumnResult(name = "religion", type = String.class),
                                        @ColumnResult(name = "occupation", type = String.class),
                                        @ColumnResult(name = "permanentResidentialAddress", type = String.class),
                                        @ColumnResult(name = "phoneNumber", type = String.class),
                                        @ColumnResult(name = "passportNumber", type = String.class),
                                        @ColumnResult(name = "expiryDate", type = LocalDate.class),
                                        @ColumnResult(name = "dateOfEntry", type = LocalDate.class),
                                        @ColumnResult(name = "lengthOfStay", type = Integer.class),
                                        @ColumnResult(name = "passportImage", type = String.class),
                                        @ColumnResult(name = "portraitPhotography", type = String.class),
                                        @ColumnResult(name = "createDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "updateDate", type = LocalDateTime.class),

                                }
                        )
                }
        ),
})
public class Experts implements Serializable {
    @Id
    private UUID id;

    @Column(name = "code")
    private String code;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "gender")
    private Boolean gender;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
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

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "expirydate")
    private LocalDate expiryDate;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "dateofentry")
    private LocalDate dateOfEntry;

    @Column(name = "lengthofstay")
    private Integer lengthOfStay;

    @Column(name = "passportimage")
    private String passportImage;

    @Column(name = "portraitphotography")
    private String portraitPhotography;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "createdate")
    private LocalDateTime createDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    public Experts() {
    }

    public Experts(UUID id, String code, String fullname, Boolean gender,
                   LocalDate birthDay, Integer countryID, String religion,
                   String occupation, String permanentResidentialAddress,
                   String phoneNumber, String passportNumber, LocalDate expiryDate,
                   LocalDate dateOfEntry, Integer lengthOfStay, String passportImage,
                   String portraitPhotography, LocalDateTime createDate, LocalDateTime updateDate) {
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
}
