package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.CommuneWard;
import com.nghiahd.server.service.CommuneWardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/commune-ward")
public class CommuneWardController {
    private final CommuneWardService communeWardService;
    private final MessageUtils messageUtils;

    public CommuneWardController(CommuneWardService communeWardService,
                                 MessageUtils messageUtils) {
        this.communeWardService = communeWardService;
        this.messageUtils = messageUtils;
    }

    @GetMapping("/{districtID}")
    public ResponseEntity<BodyResponseDTO<List<CommuneWard>>> getAllCommuneWard(@PathVariable() int districtID) {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                communeWardService.getAllCommuneWard(districtID));

    }
}
