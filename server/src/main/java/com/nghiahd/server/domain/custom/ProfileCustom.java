package com.nghiahd.server.domain.custom;

import com.nghiahd.server.domain.ExpertsInProfile;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "profile")
public class ProfileCustom {
    @Id
    private UUID id;

    @Column(name = "code")
    private String code;

    @Column(name = "projectmissionid")
    private Integer projectMissionID;

    @OneToMany(fetch = FetchType.LAZY,
            mappedBy = "profileID",
            cascade = {CascadeType.ALL})
    private Set<ExpertsInProfile> expertsInProfiles;

    public ProfileCustom(UUID id, String code, Integer projectMissionID, Set<ExpertsInProfile> expertsInProfiles) {
        this.id = id;
        this.code = code;
        this.projectMissionID = projectMissionID;
        this.expertsInProfiles = expertsInProfiles;
    }

    public ProfileCustom() {
    }
}
