package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.UnitType;
import com.nghiahd.server.service.UnitTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/public/unit-type")
public class UnitTypeController {
    private final UnitTypeService unitTypeService;
    private final MessageUtils messageUtils;

    public UnitTypeController(UnitTypeService unitTypeService,
                                  MessageUtils messageUtils) {
        this.unitTypeService = unitTypeService;
        this.messageUtils = messageUtils;
    }
    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<UnitType>>> getAllUnitType(){
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, unitTypeService.getAllUnitType());
    }
}
