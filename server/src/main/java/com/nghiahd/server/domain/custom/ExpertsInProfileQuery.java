package com.nghiahd.server.domain.custom;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "expertsinprofile")
public class ExpertsInProfileQuery {

    @EmbeddedId
    private ExpertsInProfileKey id = new ExpertsInProfileKey();

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @MapsId("expertsID")
    @JoinColumn(name = "expertsid")
    private ExpertsQuery expert;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    @MapsId("profileID")
    @JoinColumn(name = "profileid")
    private ProfileQuery profile;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "position")
    private String position;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExpertsInProfileQuery that = (ExpertsInProfileQuery) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
