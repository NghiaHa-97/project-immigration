package com.nghiahd.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "employeeinprofile")
@Getter
@Setter
public class EmployeeInProfile implements Serializable {
    private static final long serialVersionUID = 1L;

//    @Id
//    @Column(name = "employeeid")
//    private UUID employeeID;
//
//    @Id
//    @Column(name = "profileid")
//    private UUID profileID;
//
//    public EmployeeInProfile() {
//    }
//
//    public EmployeeInProfile(UUID employeeID, UUID profileID) {
//        this.employeeID = employeeID;
//        this.profileID = profileID;
//    }
//
//    public UUID getEmployeeID() {
//        return employeeID;
//    }
//
//    public void setEmployeeID(UUID employeeID) {
//        this.employeeID = employeeID;
//    }
//
//    public UUID getProfileID() {
//        return profileID;
//    }
//
//    public void setProfileID(UUID profileID) {
//        this.profileID = profileID;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        EmployeeInProfile that = (EmployeeInProfile) o;
//        return employeeID.equals(that.employeeID) && profileID.equals(that.profileID);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(employeeID, profileID);
//    }

    @Id
    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "employeeid")
    private Employee employee;

    @Id
    @Column(name = "profileid")
    private UUID profileID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmployeeInProfile that = (EmployeeInProfile) o;
        return employee.equals(that.employee) && profileID.equals(that.profileID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employee, profileID);
    }
}
