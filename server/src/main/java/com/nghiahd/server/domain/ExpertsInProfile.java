//package com.nghiahd.server.domain;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.nghiahd.server.domain.custom.ExpertsQuery;
//import com.nghiahd.server.domain.custom.ProfileQuery;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.io.Serializable;
//import java.util.Objects;
//import java.util.UUID;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "expertsinprofile")
//public class ExpertsInProfile implements Serializable {
//    private static final long serialVersionUID = 1L;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    @Column(name = "expertsid")
//    private UUID expertsID;
//
//    @Column(name = "profileid")
//    private UUID profileID;
//
//    @Column(name = "latitude")
//    private Double latitude;
//
//    @Column(name = "longitude")
//    private Double longitude;
//
//    @Column(name = "position")
//    private String position;
//}
