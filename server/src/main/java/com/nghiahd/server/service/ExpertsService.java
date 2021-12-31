package com.nghiahd.server.service;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.Experts;
import com.nghiahd.server.model.ExpertsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ExpertsService {
    Experts saveExperts(Experts experts);

    Experts editExperts(Experts experts, UUID id);

    ApiResponseCode deleteExperts(UUID id);

    Page<ExpertsDTO> getPageExperts(Pageable pageable);

    Experts getDetailExperts(UUID id);
}
