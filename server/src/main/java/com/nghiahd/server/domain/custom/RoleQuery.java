package com.nghiahd.server.domain.custom;

import com.nghiahd.server.domain.Permission;
import com.nghiahd.server.domain.PermissionRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
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

    @Column(name = "createdate")
    private LocalDateTime createDate;

    @Column(name = "updatedate")
    private LocalDateTime updateDate;

//    @OneToMany(fetch = FetchType.EAGER,
//            mappedBy = "roleQuery",
//            cascade = {CascadeType.ALL},
//            orphanRemoval = true)
//    private List<PermissionRoleQuery> permissionRoles;

//    @OneToMany(fetch = FetchType.EAGER,
//            mappedBy = "roleID",
//            cascade = {CascadeType.ALL},
//            orphanRemoval = true)
//    private List<PermissionRole> permissionRoles;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "permissionrole",
            joinColumns = @JoinColumn(name = "roleid"),
            inverseJoinColumns = @JoinColumn(name = "permissionid"))
    Set<PermissionQuery> permissions;

}
