package com.nghiahd.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private UUID id;
    private UUID employeeID;
    private String employeeCode;
    private String employeeFullname;
    private String workUnitName;
    private UUID profileID;
    private String profileCode;
    private Boolean status;
    private String reason;
}
