package com.nghiahd.server.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "permission")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private Integer code;

    @Column(name = "moduleid")
    private Integer moduleID;

    public Permission() {
    }

    public Permission(Integer id, String name, Integer code, Integer moduleID) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.moduleID = moduleID;
    }

    public Permission( Integer code, String name) {
        this.code = code;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getModuleID() {
        return moduleID;
    }

    public void setModuleID(Integer moduleID) {
        this.moduleID = moduleID;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }

        if (!(o instanceof Permission)) {
            return false;
        }

        Permission p = (Permission) o;
        return (this.id == null && Objects.equals(this.code, p.code))
                || (Objects.equals(this.id, p.id));
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, code, moduleID);
    }
}
