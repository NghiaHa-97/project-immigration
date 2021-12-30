package com.nghiahd.server.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class BodyResponseDTO<T> {
    private String status;
    private String message;
    private Integer totalPage;
    private Integer pageNumber;
    private Integer pageSize;
    private Long totalElements;
    private T data;
//    private List<T> list;

    public BodyResponseDTO(String status, String message) {
        this(status, message, null, null);
    }

    public BodyResponseDTO(String status, String message, T data) {
        this(status, message, data, null);
    }

    public BodyResponseDTO(String status, String message, T data, Long totalElements) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.totalElements = totalElements;
    }

    public <L> BodyResponseDTO(String status, String message, Page<L> page) {
        this(page);
        this.status = status;
        this.message = message;
    }

    public <L> BodyResponseDTO(Page<L> page) {
        if (page == null) {
            page = new PageImpl(Collections.emptyList());
        }
        this.totalElements = page.getTotalElements();
        this.pageNumber = page.getNumber() + 1;
        this.pageSize = page.getSize();
        this.totalPage = page.getTotalPages();
        this.data = (T)page.getContent();
    }

    public <L> BodyResponseDTO(List<L> page, Pageable pageable, long total) {
        this(new PageImpl<>(page, pageable, total));
    }

    public BodyResponseDTO() {}
}