package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.CityProvince;
import com.nghiahd.server.service.CityProvinceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/public/city-province")
public class CityProvinceController {
    private final CityProvinceService cityProvinceService;
    private final MessageUtils messageUtils;

    public CityProvinceController(CityProvinceService cityProvinceService,
                                  MessageUtils messageUtils) {
        this.cityProvinceService = cityProvinceService;
        this.messageUtils = messageUtils;
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<CityProvince>>> getAllCityProvince() {
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, cityProvinceService.getAllCityProvince());
    }
}
