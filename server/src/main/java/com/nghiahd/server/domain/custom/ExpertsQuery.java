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

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "countryid")
    private Country country;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "experts")
    @JsonIgnore
    Set<ProfileQuery> profiles;

}
