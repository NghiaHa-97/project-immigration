package com.nghiahd.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "statusprofile")
public class StatusProfile {
    @Id
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    public StatusProfile() {
    }

    public StatusProfile(Integer id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public StatusProfile(Integer id) {
        this.id = id;
    }
}
