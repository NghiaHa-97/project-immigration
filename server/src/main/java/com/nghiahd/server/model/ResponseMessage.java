package com.nghiahd.server.model;

public class ResponseMessage {
    private Integer id;
    private String message;
    private boolean success;

    public ResponseMessage(Integer id, String message) {
        this.id = id;
        this.message = message;
    }

    public ResponseMessage(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
