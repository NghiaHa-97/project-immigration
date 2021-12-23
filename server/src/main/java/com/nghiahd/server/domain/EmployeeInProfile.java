package com.nghiahd.server.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "employeeinprofile")
public class EmployeeInProfile implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "employeeid")
    private UUID employeeID;

    @Id
    @Column(name = "profileid")
    private UUID profileID;

    public EmployeeInProfile() {
    }

    public EmployeeInProfile(UUID employeeID, UUID profileID) {
        this.employeeID = employeeID;
        this.profileID = profileID;
    }

    public UUID getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(UUID employeeID) {
        this.employeeID = employeeID;
    }

    public UUID getProfileID() {
        return profileID;
    }

    public void setProfileID(UUID profileID) {
        this.profileID = profileID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmployeeInProfile that = (EmployeeInProfile) o;
        return employeeID.equals(that.employeeID) && profileID.equals(that.profileID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employeeID, profileID);
    }
}
