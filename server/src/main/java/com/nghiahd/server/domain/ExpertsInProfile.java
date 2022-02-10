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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "expertsinprofile")
public class ExpertsInProfile implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "expertsid")
    private UUID expertsID;

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
