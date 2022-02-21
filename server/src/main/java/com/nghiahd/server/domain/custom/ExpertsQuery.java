package com.nghiahd.server.domain.custom;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nghiahd.server.common.mapper.LocalDateDeserializer;
import com.nghiahd.server.common.mapper.LocalDateSerializer;
import com.nghiahd.server.domain.Country;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "experts")
public class ExpertsQuery implements Serializable {
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

//    @Column(name = "countryid")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "countryid")
    @Fetch(FetchMode.JOIN)
    private Country country;

//    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "experts")
//    @JsonIgnore
//    Set<ProfileQuery> profiles;

//    @OneToMany(fetch = FetchType.LAZY,
//            mappedBy = "expert")
//    @JsonIgnore
//    Set<ExpertsInProfileQuery> expertsInProfileQueries = new HashSet<>();

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
        ExpertsQuery other = (ExpertsQuery) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

}
