package com.nghiahd.server.domain.custom;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nghiahd.server.common.mapper.LocalDateTimeDeserializer;
import com.nghiahd.server.common.mapper.LocalDateTimeSerializer;
import com.nghiahd.server.domain.ProjectMission;
import com.nghiahd.server.domain.StatusProfile;
import com.nghiahd.server.domain.WorkUnit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "projectmissionid")
    @Fetch(FetchMode.JOIN)
    private ProjectMission projectMission;

    //    @Column(name = "workunitid")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workunitid")
    @Fetch(FetchMode.JOIN)
    private WorkUnit workUnit;

    @Column(name = "departmentid")
    private Integer departmentID;

    @Column(name = "vehicleid")
    private Integer vehicleID;

    //    @Column(name = "statusprofileid")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "statusprofileid")
    @Fetch(FetchMode.JOIN)
    private StatusProfile statusProfile;

    @Column(name = "description")
    private String description;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "expirationdate")
    private LocalDateTime expirationDate;

    //    @Column(name = "employeecreateid")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employeecreateid")
    @Fetch(FetchMode.JOIN)
    private EmployeeQuery employeeCreate;

    //    @Column(name = "approverid")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approverid")
    @Fetch(FetchMode.JOIN)
    private EmployeeQuery approver;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "createdate")
    private LocalDateTime createDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "updatedate")
    private LocalDateTime updateDate;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "employeeinprofile",
            joinColumns = @JoinColumn(name = "profileid"),
            inverseJoinColumns = @JoinColumn(name = "employeeid"))
    @Fetch(FetchMode.JOIN)
    Set<EmployeeQuery> employees;

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(
//            name = "expertsinprofile",
//            joinColumns = @JoinColumn(name = "profileid"),
//            inverseJoinColumns = @JoinColumn(name = "expertsid"))
//    Set<ExpertsQuery> experts;

    @OneToMany(orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL,
            mappedBy = "profile")
    @Fetch(FetchMode.JOIN)
    Set<ExpertsInProfileQuery> expertsInProfileQueries = new HashSet<>();

    public ProfileQuery(UUID id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProfileQuery other = (ProfileQuery) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
