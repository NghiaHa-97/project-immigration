package com.nghiahd.server.common;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;


public final class RestResponseWrapper {
    private RestResponseWrapper() {
    }

    public static <T> ResponseEntity<BodyResponseDTO<T>> getResponse(HttpStatus status, ApiResponseCode errorCode, MessageUtils messageUtil, T data, Long totalResults) {
        String message = errorCode.getMessage();
        if (messageUtil != null) {
            message = messageUtil.populate(errorCode.getMessage());
        }
        BodyResponseDTO<T> bodyResponse = new BodyResponseDTO<>(errorCode.getCode(), message, data, totalResults);
        return new ResponseEntity<>(bodyResponse, status);
    }

    public static <T> ResponseEntity<BodyResponseDTO<T>> getResponse(HttpStatus status,ApiResponseCode errorCode, MessageUtils messageUtil, T data) {
        return getResponse(status, errorCode, messageUtil, data, null);
    }

    public static <T> ResponseEntity<BodyResponseDTO<List<T>>> getResponse(HttpStatus status, ApiResponseCode errorCode, MessageUtils messageUtil, Page<T> page) {
        String message = errorCode.getMessage();
        if (messageUtil != null) {
            message = messageUtil.populate(errorCode.getMessage());
        }
        BodyResponseDTO<List<T>> bodyResponse = new BodyResponseDTO<>(errorCode.getCode(), message, page);
        return new ResponseEntity<>(bodyResponse, status);
    }

    public static <T> ResponseEntity<BodyResponseDTO<T>> getResponse(HttpStatus status, ApiResponseCode errorCode, MessageUtils messageUtil) {
        String message = errorCode.getMessage();
        if (messageUtil != null) {
            message = messageUtil.populate(errorCode.getMessage());
        }
        BodyResponseDTO<T> bodyResponse = new BodyResponseDTO<>(errorCode.getCode(), message);
        return new ResponseEntity<>(bodyResponse, status);
    }
}

