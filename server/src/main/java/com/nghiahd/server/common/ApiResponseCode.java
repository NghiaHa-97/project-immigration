package com.nghiahd.server.common;

import org.springframework.http.HttpStatus;

public enum ApiResponseCode {
    SUCCESS(HttpStatus.OK, "200", "GLOBAL.SUCCESS"),
    UNKNOWN_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "500", "GLOBAL.SERVER_ERROR"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "400", "GLOBAL.BAD_REQUEST"),
    INPUT_PARAMS_INVALID(HttpStatus.BAD_REQUEST, "400", "INPUT_PARAMS_INVALID"),
    ID_NULL(HttpStatus.BAD_REQUEST, "400", "ID_NULL"),
    ENTITY_NULL(HttpStatus.BAD_REQUEST, "400", "ENTITY_NULL"),
    EXIST_RELATION(HttpStatus.BAD_REQUEST, "400", "EXIST_RELATION"),
    EXIST(HttpStatus.BAD_REQUEST, "400", "EXIST"),
    USERNAME_OR_PASSWORD_EMPTY(HttpStatus.BAD_REQUEST, "400", "USERNAME_OR_PASSWORD_EMPTY"),
    LOGIN_FAIL(HttpStatus.BAD_REQUEST, "400", "LOGIN_FAIL"),
    USERNAME_EXIST(HttpStatus.BAD_REQUEST, "400", "USERNAME_EXIST"),
    REGISTER_SUCCESS(HttpStatus.OK, "200", "REGISTER_SUCCESS"),
    LOGIN_SUCCESS(HttpStatus.OK, "200", "LOGIN_SUCCESS"),
    LOGOUT_SUCCESS(HttpStatus.OK, "200", "LOGOUT_SUCCESS"),
    WRONG_FORMAT_DATETIME(HttpStatus.UNPROCESSABLE_ENTITY, "422", "GLOBAL.WRONG_FORMAT_DATETIME"),
    NOT_FOUND(HttpStatus.NOT_FOUND, "404", "NOT_FOUND"),
    WORK_UNIT_OR_EMPLOYEE_NULL(HttpStatus.BAD_REQUEST, "400", "WORK_UNIT_OR_EMPLOYEE_NULL"),
    SAVE_FAILED(HttpStatus.BAD_REQUEST, "400", "SAVE_FAILED"),
    EXPIRATION_DATE(HttpStatus.BAD_REQUEST, "400", "EXPIRATION_DATE"),
    EMPLOYEE_DEPARTMENT_NULL(HttpStatus.BAD_REQUEST, "400", "EMPLOYEE_DEPARTMENT_NULL"),
    EMPLOYEE_DEPARTMENT_COEXIST(HttpStatus.BAD_REQUEST, "400", "EMPLOYEE_DEPARTMENT_COEXIST"),
    WORK_UNIT_NULL(HttpStatus.BAD_REQUEST, "400", "WORK_UNIT_NULL"),
    COMMENT_EXIST(HttpStatus.BAD_REQUEST, "400", "COMMENT_EXIST");


    private final HttpStatus status;
    private final String code;
    private final String message;

    ApiResponseCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }


}
