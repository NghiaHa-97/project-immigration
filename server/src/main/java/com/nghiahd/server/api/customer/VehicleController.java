package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.Vehicle;
import com.nghiahd.server.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/public/vehicle")
public class VehicleController {
    private final VehicleService vehicleService;
    private final MessageUtils messageUtils;

    public VehicleController(VehicleService vehicleService, MessageUtils messageUtils) {
        this.vehicleService = vehicleService;
        this.messageUtils = messageUtils;
    }


    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<Vehicle>>> getAllCityProvince() {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                vehicleService.getAllVehicle());
    }
}
