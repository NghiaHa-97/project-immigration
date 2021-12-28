package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.Experts;
import com.nghiahd.server.service.ExpertsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "/public/experts")
public class ExpertsController {

    private final ExpertsService expertsService;
    private final MessageUtils messageUtils;

    public ExpertsController(ExpertsService expertsService,
                             MessageUtils messageUtils) {
        this.expertsService = expertsService;
        this.messageUtils = messageUtils;
    }


    @PostMapping(value = "/create-experts")
    public ResponseEntity<BodyResponseDTO<Object>> createExperts(@RequestBody Experts ex) {
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, expertsService.saveExperts(ex));
    }

    @PutMapping(value = "/edit-experts/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> editExperts(@RequestBody Experts experts, @PathVariable UUID id) {
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils,expertsService.editExperts(experts, id));
    }

    @DeleteMapping(value = "/delete-experts/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> deleteExperts(@PathVariable UUID id) {
        int checkDelete = expertsService.deleteExperts(id);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, checkDelete != 0);
    }

}
