package com.nghiahd.server.domain.custom;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nghiahd.server.common.mapper.LocalDateDeserializer;
import com.nghiahd.server.common.mapper.LocalDateSerializer;
import com.nghiahd.server.domain.Department;
import com.nghiahd.server.domain.Position;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employee")
public class EmployeeQuery {
    @Id
    private UUID id;

    @Column(name = "code")
    private String code;

    @Column(name = "fullname")
    private String fullname;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "birthday")
    private LocalDate birthDay;

//    @Column(name = "departmentid")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "departmentid")
    private Department department;

//    @Column(name = "positionid")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "positionid")
    private Position position;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "employees")
    @JsonIgnore
    Set<ProfileQuery> profiles;

    public EmployeeQuery(UUID id) {
        this.id = id;
    }
}
