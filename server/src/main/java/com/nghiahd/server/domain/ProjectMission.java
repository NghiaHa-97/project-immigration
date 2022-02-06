package com.nghiahd.server.domain;

import com.nghiahd.server.model.ProjectMissionDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "projectmission")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "ProjectMissionDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = ProjectMissionDTO.class,
                                columns = {
                                        @ColumnResult(name = "id", type = Integer.class),
                                        @ColumnResult(name = "name", type = String.class),
                                        @ColumnResult(name = "workUnitCreateID", type = Integer.class),
                                        @ColumnResult(name = "workUnitCreateName", type = String.class),
                                        @ColumnResult(name = "employeeID", type = UUID.class),
                                        @ColumnResult(name = "employeeName", type = String.class),
                                        @ColumnResult(name = "employeeCode", type = String.class),
                                        @ColumnResult(name = "createDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "updateDate", type = LocalDateTime.class),

                                }
                        )
                }
        ),
})
public class ProjectMission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "workunitcreateid")
    private Integer workUnitCreateID;

    @Column(name = "employeeid")
    private UUID employeeID;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    public ProjectMission() {
    }

    public ProjectMission(Integer id, String name, String description, Integer workUnitCreateID) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.workUnitCreateID = workUnitCreateID;
    }
}
