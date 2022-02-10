package com.nghiahd.server.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "employeeinprofile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeInProfile implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "employeeid")
    private UUID employeeID;

    @Id
    @Column(name = "profileid")
    private UUID profileID;


    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
