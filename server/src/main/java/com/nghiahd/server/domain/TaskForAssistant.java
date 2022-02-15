//package com.nghiahd.server.domain;
//
//import com.nghiahd.server.model.TaskForAssistantDTO;
//import com.nghiahd.server.model.TaskForDepartmentDTO;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//import java.util.UUID;
//
//@Entity
//@Table(name = "taskforassistant")
//@SqlResultSetMappings({
//        @SqlResultSetMapping(
//                name = "tfaDTOList",
//                classes = {
//                        @ConstructorResult(
//                                targetClass = TaskForAssistantDTO.class,
//                                columns = {
//                                        @ColumnResult(name = "id", type = UUID.class),
//                                        @ColumnResult(name = "employeeID", type = UUID.class),
//                                        @ColumnResult(name = "profileID", type = UUID.class),
//                                        @ColumnResult(name = "description", type = String.class),
//                                        @ColumnResult(name = "result", type = String.class),
//                                        @ColumnResult(name = "expirationDate", type = LocalDateTime.class),
//                                        @ColumnResult(name = "createDate", type = LocalDateTime.class),
//                                        @ColumnResult(name = "employeeCode", type = String.class),
//                                        @ColumnResult(name = "employeeFullName", type = String.class),
//                                        @ColumnResult(name = "profileCode", type = String.class),
//                                        @ColumnResult(name = "statusProfileID", type = UUID.class),
//                                        @ColumnResult(name = "statusProfileName", type = String.class),
//
//                                }
//                        )
//                }
//        ),
//})
//
//public class TaskForAssistant {
//    @Id
//    private UUID id;
//
//    @Column(name = "employeeid")
//    private UUID employeeID;
//
//    @Column(name = "profileid")
//    private UUID profileID;
//
//    @Column(name = "description")
//    private String description;
//
//    @Column(name = "result")
//    private String result;
//
//    @Column(name = "expirationdate")
//    private LocalDateTime expirationDate;
//
//    @Column(name = "createdate")
//    private LocalDateTime createDate;
//
//    public TaskForAssistant(UUID id, UUID employeeID, UUID profileID, String description, String result, LocalDateTime expirationDate, LocalDateTime createDate) {
//        this.id = id;
//        this.employeeID = employeeID;
//        this.profileID = profileID;
//        this.description = description;
//        this.result = result;
//        this.expirationDate = expirationDate;
//        this.createDate = createDate;
//    }
//
//    public TaskForAssistant() {
//    }
//
//    public UUID getId() {
//        return id;
//    }
//
//    public void setId(UUID id) {
//        this.id = id;
//    }
//
//    public UUID getEmployeeID() {
//        return employeeID;
//    }
//
//    public void setEmployeeID(UUID employeeID) {
//        this.employeeID = employeeID;
//    }
//
//    public UUID getProfileID() {
//        return profileID;
//    }
//
//    public void setProfileID(UUID profileID) {
//        this.profileID = profileID;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public String getResult() {
//        return result;
//    }
//
//    public void setResult(String result) {
//        this.result = result;
//    }
//
//    public LocalDateTime getExpirationDate() {
//        return expirationDate;
//    }
//
//    public void setExpirationDate(LocalDateTime expirationDate) {
//        this.expirationDate = expirationDate;
//    }
//
//    public LocalDateTime getCreateDate() {
//        return createDate;
//    }
//
//    public void setCreateDate(LocalDateTime createDate) {
//        this.createDate = createDate;
//    }
//}
