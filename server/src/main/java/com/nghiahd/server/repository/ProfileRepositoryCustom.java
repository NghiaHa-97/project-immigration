package com.nghiahd.server.repository;

import com.nghiahd.server.model.ProfileDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProfileRepositoryCustom {
    Page<ProfileDTO> getListProfile(Pageable pageable);
}
