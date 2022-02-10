package com.nghiahd.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.nghiahd.server.model.ProfileDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "profile")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "ProfileDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = ProfileDTO.class,
                                columns = {
                                }
                        )
                }
        ),
        @SqlResultSetMapping(
                name = "ProfileListDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = ProfileDTO.class,
                                columns = {
                                        @ColumnResult(name = "id", type = UUID.class),
                                        @ColumnResult(name = "code", type = String.class),
                                        @ColumnResult(name = "projectMissionID", type = Integer.class),
                                        @ColumnResult(name = "workUnitID", type = Integer.class),
                                        @ColumnResult(name = "departmentID", type = Integer.class),
                                        @ColumnResult(name = "vehicleID", type = Integer.class),
                                        @ColumnResult(name = "statusProfileID", type = Integer.class),
                                        @ColumnResult(name = "description", type = String.class),
                                        @ColumnResult(name = "createDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "updateDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "expirationDate", type = LocalDateTime.class),

                                        @ColumnResult(name = "employeeCreateID", type = UUID.class),
                                        @ColumnResult(name = "employeeCreateName", type = String.class),
                                        @ColumnResult(name = "approverID", type = UUID.class),
                                        @ColumnResult(name = "approverName", type = String.class),
//                                        @ColumnResult(name = "unitCreateProfileID", type = Integer.class),
//                                        @ColumnResult(name = "unitCreateProfileName", type = String.class),
                                        @ColumnResult(name = "quantityEmployee", type = Integer.class),
                                        @ColumnResult(name = "quantityExperts", type = Integer.class),

                                        @ColumnResult(name = "projectMissionName", type = String.class),
                                        @ColumnResult(name = "workUnitName", type = String.class),
                                        @ColumnResult(name = "departmentName", type = String.class),
                                        @ColumnResult(name = "vehicleName", type = String.class),
                                        @ColumnResult(name = "statusProfileName", type = String.class),
                                }
                        )
                }
        ),
})
public class Profile implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "code")
    private String code;

    @Column(name = "projectmissionid")
    private Integer projectMissionID;

    @Column(name = "workunitid")
    private Integer workUnitID;

    @Column(name = "departmentid")
    private Integer departmentID;

    @Column(name = "vehicleid")
    private Integer vehicleID;

    @Column(name = "statusprofileid")
    private Integer statusProfileID;

    @Column(name = "description")
    private String description;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    @Column(name = "expirationdate")
    private LocalDateTime expirationDate;

    @Column(name = "employeecreateid")
    private UUID employeeCreateID;

    @Column(name = "approverid")
    private UUID approverID;

    public Profile() {
    }

    public Profile(UUID id, String code, Integer projectMissionID,
                   Integer workUnitID, Integer departmentID,
                   Integer vehicleID, Integer statusProfileID,
                   String description, LocalDateTime createDate,
                   LocalDateTime updateDate, LocalDateTime expirationDate,
                   UUID employeeCreateID, UUID approverID) {
        this.id = id;
        this.code = code;
        this.projectMissionID = projectMissionID;
        this.workUnitID = workUnitID;
        this.departmentID = departmentID;
        this.vehicleID = vehicleID;
        this.statusProfileID = statusProfileID;
        this.description = description;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.expirationDate = expirationDate;
        this.employeeCreateID = employeeCreateID;
        this.approverID = approverID;
    }
}
