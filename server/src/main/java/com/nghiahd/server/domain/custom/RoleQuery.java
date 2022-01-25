package com.nghiahd.server.domain.custom;

import com.nghiahd.server.domain.PermissionRole;
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
@Table(name = "role")
public class RoleQuery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany(fetch = FetchType.EAGER,
            mappedBy = "roleID",
            cascade = {CascadeType.ALL})
    private Set<PermissionRole> permissionRoles;

}
