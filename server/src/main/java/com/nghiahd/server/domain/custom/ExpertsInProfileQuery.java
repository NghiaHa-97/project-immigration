package com.nghiahd.server.domain.custom;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nghiahd.server.domain.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.lang.Nullable;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("expertsID")
    @JoinColumn(name = "expertsid", referencedColumnName = "id")
    @Fetch(FetchMode.JOIN)
    private ExpertsQuery expert;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("profileID")
    @JoinColumn(name = "profileid", referencedColumnName = "id")
    private ProfileQuery profile;

    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "locationid")
    private Location location;

    @Column(name = "position")
    private String position;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ExpertsInProfileQuery other = (ExpertsInProfileQuery) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (expert != null && other.expert != null) {
            return expert.getId().equals(other.expert.getId());
        }
        return true;
    }
}
