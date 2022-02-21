package com.nghiahd.server.domain;

import javax.persistence.*;

@Entity
@Table(name = "workunit")
public class WorkUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "locationid")
    private Long locationID;

    @Column(name = "cityprovinceid")
    private Integer cityProvinceID;

    @Column(name = "districtid")
    private Integer districtID;

    @Column(name = "communewardid")
    private Integer communeWardID;

    @Column(name = "description")
    private String description;

    @Column(name = "unittypeid")
    private Integer unitTypeID;

}
