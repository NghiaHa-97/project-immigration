package com.nghiahd.server.service;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.Experts;
import com.nghiahd.server.model.ExpertsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface ExpertsService {

    Experts editExperts(Experts experts,
                        MultipartFile passportImage,
                        MultipartFile portraitPhotography,
                        UUID id);

    ApiResponseCode deleteExperts(UUID id);

    Page<ExpertsDTO> getPageExperts(Pageable pageable,
                                    String code,
                                    String fullname,
                                    String countryName,
                                    String permanentResidentialAddress,
                                    String phoneNumber,
                                    String passportNumber);

    Experts getDetailExperts(UUID id);

    Experts createExperts(Experts experts,
                          MultipartFile passportImage,
                          MultipartFile portraitPhotography);
}
