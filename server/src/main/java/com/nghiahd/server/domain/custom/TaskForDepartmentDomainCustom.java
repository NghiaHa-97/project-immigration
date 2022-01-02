package com.nghiahd.server.domain.custom;

import com.nghiahd.server.domain.Department;
import com.nghiahd.server.domain.Profile;
import lombok.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "taskfordepartment")
public class TaskForDepartmentDomainCustom {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private UUID id;

    @NotFound(action = NotFoundAction.IGNORE)
    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "departmentid", referencedColumnName = "id")
    private Department department;

    @NotFound(action = NotFoundAction.IGNORE)
    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "profileid", referencedColumnName = "id")
    private Profile profile;

    @Column(name = "description")
    private String description;

    @Column(name = "result")
    private String result;

    @Column(name = "expirationdate")
    private LocalDateTime expirationDate;

    @Column(name = "createdate")
    private LocalDateTime createDate;
}
