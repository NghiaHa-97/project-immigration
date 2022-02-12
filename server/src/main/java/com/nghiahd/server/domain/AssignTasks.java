package com.nghiahd.server.domain;

import com.nghiahd.server.model.AssignTasksDTO;
import com.nghiahd.server.model.TaskForAssistantDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assigntasks")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "AssignTasksDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = AssignTasksDTO.class,
                                columns = {
                                        @ColumnResult(name = "id", type = UUID.class),
                                        @ColumnResult(name = "title", type = String.class),
                                        @ColumnResult(name = "employeeID", type = UUID.class),
                                        @ColumnResult(name = "employeeFullname", type = String.class),
                                        @ColumnResult(name = "employeeCode", type = String.class),
                                        @ColumnResult(name = "departmentID", type = Integer.class),
                                        @ColumnResult(name = "departmentName", type = String.class),
                                        @ColumnResult(name = "profileID", type = UUID.class),
                                        @ColumnResult(name = "profileCode", type = String.class),
                                        @ColumnResult(name = "projectMissionName", type = String.class),
                                        @ColumnResult(name = "expirationDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "createDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "updateDate", type = LocalDateTime.class),
                                        @ColumnResult(name = "statusProfileID", type = Integer.class),
                                        @ColumnResult(name = "statusProfileName", type = String.class),
                                        @ColumnResult(name = "employeeCreateID", type = UUID.class),
                                        @ColumnResult(name = "employeeCreateFullName", type = String.class),
                                        @ColumnResult(name = "employeeCreateCode", type = String.class),
                                        @ColumnResult(name = "description", type = String.class),
                                        @ColumnResult(name = "result", type = String.class),

                                }
                        )
                }
        )
})
public class AssignTasks {
    @Id
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "employeeid")
    private UUID employeeID;

    @Column(name = "departmentid")
    private Integer departmentID;

    @Column(name = "profileid")
    private UUID profileID;

    @Column(name = "description")
    private String description;

    @Column(name = "result")
    private String result;

    @Column(name = "expirationdate")
    private LocalDateTime expirationDate;

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

    @Column(name = "employeecreateid")
    private UUID employeeCreateID;
}
