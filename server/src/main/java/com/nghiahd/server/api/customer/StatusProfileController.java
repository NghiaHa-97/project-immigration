package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.CityProvince;
import com.nghiahd.server.domain.StatusProfile;
import com.nghiahd.server.service.StatusProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/public/status-profile")
public class StatusProfileController {
    private final StatusProfileService statusProfileService;
    private final MessageUtils messageUtils;

    public StatusProfileController(StatusProfileService statusProfileService,
                                   MessageUtils messageUtils) {
        this.statusProfileService = statusProfileService;
        this.messageUtils = messageUtils;
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<StatusProfile>>> getAll() {
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, statusProfileService.getAll());
    }
}
