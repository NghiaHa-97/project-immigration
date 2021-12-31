package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.District;
import com.nghiahd.server.service.DistrictService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/district")
public class DistrictController {
    private final DistrictService districtService;
    private final MessageUtils messageUtils;

    public DistrictController(DistrictService districtService, MessageUtils messageUtils) {
        this.districtService = districtService;
        this.messageUtils = messageUtils;
    }

    @GetMapping("/{cityProvinceID}")
    public ResponseEntity<BodyResponseDTO<List<District>>> getAllDistrict(@PathVariable() int cityProvinceID) {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                districtService.getAllDistrict(cityProvinceID));

    }
}
