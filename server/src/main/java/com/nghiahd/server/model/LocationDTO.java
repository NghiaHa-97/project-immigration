package com.nghiahd.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationDTO {
    private Long id;
    private Integer objectTypeID;
    private String name;
    private Double longitude;
    private Double latitude;
    private String description;
    private Integer cityProvinceID;
    private String cityProvinceName;
    private Integer districtID;
    private String districtName;
    private Integer communeWardID;
    private String communeWardName;
}
