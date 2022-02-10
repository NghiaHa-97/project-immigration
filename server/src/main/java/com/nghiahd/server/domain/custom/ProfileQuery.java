package com.nghiahd.server.domain.custom;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nghiahd.server.common.mapper.LocalDateTimeDeserializer;
import com.nghiahd.server.common.mapper.LocalDateTimeSerializer;
import com.nghiahd.server.domain.ProjectMission;
import com.nghiahd.server.domain.StatusProfile;
import com.nghiahd.server.domain.WorkUnit;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "profile")
public class ProfileQuery implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "code")
    private String code;

//    @Column(name = "projectmissionid")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projectmissionid")
    private ProjectMission projectMission;

//    @Column(name = "workunitid")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "workunitid")
    private WorkUnit workUnit;

    @Column(name = "departmentid")
    private Integer departmentID;

    @Column(name = "vehicleid")
    private Integer vehicleID;

//    @Column(name = "statusprofileid")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "statusprofileid")
    private StatusProfile statusProfile;

    @Column(name = "description")
    private String description;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "expirationdate")
    private LocalDateTime expirationDate;

//    @Column(name = "employeecreateid")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employeecreateid")
    private EmployeeQuery employeeCreate;

//    @Column(name = "approverid")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "approverid")
    private EmployeeQuery approver;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "createdate")
    private LocalDateTime createDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "updatedate")
    private LocalDateTime updateDate;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "employeeinprofile",
            joinColumns = @JoinColumn(name = "profileid"),
            inverseJoinColumns = @JoinColumn(name = "employeeid"))
    Set<EmployeeQuery> employees;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "expertsinprofile",
            joinColumns = @JoinColumn(name = "profileid"),
            inverseJoinColumns = @JoinColumn(name = "expertsid"))
    Set<ExpertsQuery> experts;

}
