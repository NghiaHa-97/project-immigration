package com.nghiahd.server.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "expertsinprofile")
public class ExpertsInProfile implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "expertsid")
    private UUID expertsID;

    @Id
    @Column(name = "profileid")
    private UUID profileID;

    public ExpertsInProfile() {
    }

    public ExpertsInProfile(UUID expertsID, UUID profileID) {
        this.expertsID = expertsID;
        this.profileID = profileID;
    }

    public UUID getExpertsID() {
        return expertsID;
    }

    public void setExpertsID(UUID expertsID) {
        this.expertsID = expertsID;
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
        ExpertsInProfile that = (ExpertsInProfile) o;
        return expertsID.equals(that.expertsID) && profileID.equals(that.profileID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(expertsID, profileID);
    }
}
