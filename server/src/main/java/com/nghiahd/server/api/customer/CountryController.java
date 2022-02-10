package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.CityProvince;
import com.nghiahd.server.domain.Country;
import com.nghiahd.server.service.CityProvinceService;
import com.nghiahd.server.service.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/public/country")
public class CountryController {
    private final CountryService countryService;
    private final MessageUtils messageUtils;

    public CountryController(CountryService countryService,
                             MessageUtils messageUtils) {
        this.countryService = countryService;
        this.messageUtils = messageUtils;
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<Country>>> getAllCountry() {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                countryService.getAllCountry());
    }
}
