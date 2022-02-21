package com.nghiahd.server.domain;

import com.nghiahd.server.model.LocationDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "location")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "LocationDTO",
                classes = {
                        @ConstructorResult(
                                targetClass = LocationDTO.class,
                                columns = {
                                        @ColumnResult(name = "id", type = Long.class),
                                        @ColumnResult(name = "objectTypeID", type = Integer.class),
                                        @ColumnResult(name = "name", type = String.class),
                                        @ColumnResult(name = "longitude", type = Double.class),
                                        @ColumnResult(name = "latitude", type = Double.class),
                                        @ColumnResult(name = "description", type = String.class),
                                        @ColumnResult(name = "cityProvinceID", type = Integer.class),
                                        @ColumnResult(name = "cityProvinceName", type = String.class),
                                        @ColumnResult(name = "districtID", type = Integer.class),
                                        @ColumnResult(name = "districtName", type = String.class),
                                        @ColumnResult(name = "communeWardID", type = Integer.class),
                                        @ColumnResult(name = "communeWardName", type = String.class)
                                }
                        )
                }
        )
})
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "objecttypeid")
    private Integer objectTypeID;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "cityprovinceid")
    private Integer cityProvinceID;

    @Column(name = "districtid")
    private Integer districtID;

    @Column(name = "communewardid")
    private Integer communeWardID;

    @Column(name = "description")
    private String description;
}
