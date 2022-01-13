package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.service.WorkUnitService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/public/work-unit")
public class WorkUnitController {
    private final WorkUnitService workUnitService;
    private final MessageUtils messageUtils;

    public WorkUnitController(WorkUnitService workUnitService,
                              MessageUtils messageUtils) {
        this.workUnitService = workUnitService;
        this.messageUtils = messageUtils;
    }
    @GetMapping(value = "/unit-type/{id}")
    public ResponseEntity<BodyResponseDTO<List<Map<String,Object>>>> findWorkUnitWithUnitTypeID(@PathVariable Integer id){
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, workUnitService.findWorkUnitWithUnitTypeID(id));
    }

}
