package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.Position;
import com.nghiahd.server.service.PositionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/public/position")
public class PositionController {
    private final PositionService positionService;
    private final MessageUtils messageUtils;

    public PositionController(PositionService positionService,
                                MessageUtils messageUtils) {
        this.positionService = positionService;
        this.messageUtils = messageUtils;
    }
    @GetMapping(value = "/department/{id}")
    public ResponseEntity<BodyResponseDTO<List<Position>>> findDepartmentByWorkUnitID(@PathVariable Integer id){
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, this.positionService.findPositionByDepartmentID(id));
    }
}
