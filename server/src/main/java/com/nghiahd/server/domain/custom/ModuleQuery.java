package com.nghiahd.server.domain.custom;

import com.nghiahd.server.domain.Permission;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "module")
public class ModuleQuery {
    @Id
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private Integer code;

    @OneToMany(fetch = FetchType.EAGER,
            mappedBy = "moduleID",
            cascade = {CascadeType.ALL})
    @OrderBy(value = "name asc")
    private Set<Permission> permissions;
}
