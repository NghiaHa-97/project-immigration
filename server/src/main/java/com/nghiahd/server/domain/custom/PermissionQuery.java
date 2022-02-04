package com.nghiahd.server.domain.custom;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nghiahd.server.domain.Permission;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "permission")
public class PermissionQuery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @Column(name = "name")
//    private String name;
//
//    @Column(name = "code")
//    private Integer code;
//
//    @Column(name = "moduleid")
//    private Integer moduleID;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "permissions")
    @JsonIgnore
    Set<RoleQuery> roleQueries;

}
