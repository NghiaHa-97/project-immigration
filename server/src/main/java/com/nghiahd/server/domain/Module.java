package com.nghiahd.server.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "module")
public class Module {
    @Id
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private Integer code;

    public Module() {
    }

    public Module(Integer id, String name, Integer code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    public Module(Integer code, String name) {
        this.name = name;
        this.code = code;
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

    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }

        if (!(o instanceof Module)) {
            return false;
        }

        Module m = (Module) o;
        return (this.id == null && Objects.equals(this.code, m.code))
                || (Objects.equals(this.id, m.id));
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, code);
    }
}
