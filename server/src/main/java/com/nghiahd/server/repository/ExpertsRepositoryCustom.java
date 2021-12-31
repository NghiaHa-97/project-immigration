package com.nghiahd.server.repository;

import com.nghiahd.server.model.ExpertsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ExpertsRepositoryCustom {

    Page<ExpertsDTO> getPageExperts(Pageable pageable);
}
