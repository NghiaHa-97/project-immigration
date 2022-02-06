package com.nghiahd.server.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ProjectMissionDTO {
    private Integer id;
    private String name;
    private Integer workUnitCreateID;
    private String workUnitCreateName;
    private UUID employeeID;
    private String employeeName;
    private String employeeCode;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public ProjectMissionDTO(Integer id,
                             String name,
                             Integer workUnitCreateID,
                             String workUnitCreateName,
                             UUID employeeID,
                             String employeeName,
                             String employeeCode,
                             LocalDateTime createDate,
                             LocalDateTime updateDate) {
        this.id = id;
        this.name = name;
        this.workUnitCreateID = workUnitCreateID;
        this.workUnitCreateName = workUnitCreateName;
        this.employeeID = employeeID;
        this.employeeName = employeeName;
        this.employeeCode = employeeCode;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }
}
