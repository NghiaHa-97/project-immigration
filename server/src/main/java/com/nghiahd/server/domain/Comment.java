package com.nghiahd.server.domain;

import com.nghiahd.server.model.AssignTasksDTO;
import com.nghiahd.server.model.CommentDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comment")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "CommentDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = CommentDTO.class,
                                columns = {
                                        @ColumnResult(name = "id", type = UUID.class),
                                        @ColumnResult(name = "employeeID", type = UUID.class),
                                        @ColumnResult(name = "employeeCode", type = String.class),
                                        @ColumnResult(name = "employeeFullname", type = String.class),
                                        @ColumnResult(name = "workUnitName", type = String.class),
                                        @ColumnResult(name = "profileID", type = UUID.class),
                                        @ColumnResult(name = "profileCode", type = String.class),
                                        @ColumnResult(name = "status", type = Boolean.class),
                                        @ColumnResult(name = "reason", type = String.class),
                                }
                        )
                }
        )
})
public class Comment {
    @Id
    private UUID id;

    @Column(name = "employeeid")
    private UUID employeeID;

    @Column(name = "profileid")
    private UUID profileID;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "reason")
    private String reason;
}
