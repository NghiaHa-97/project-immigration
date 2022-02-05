package com.nghiahd.server.repository;

import com.nghiahd.server.model.ProfileDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface ProfileRepositoryCustom {
    Page<ProfileDTO> getListProfile(Pageable pageable,
                                    String code,
                                    String projectMissionName,
                                    Integer statusProfileID,
                                    String employeeCreate,
                                    String approver,
                                    LocalDate expirationDate);
}
