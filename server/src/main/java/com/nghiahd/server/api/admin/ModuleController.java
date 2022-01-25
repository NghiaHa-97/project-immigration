package com.nghiahd.server.api.admin;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.custom.ModuleQuery;
import com.nghiahd.server.service.ModuleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/admin/module")
public class ModuleController {
    private final MessageUtils messageUtils;
    private final ModuleService moduleService;

    public ModuleController(MessageUtils messageUtils,
                            ModuleService moduleService) {
        this.messageUtils = messageUtils;
        this.moduleService = moduleService;
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<ModuleQuery>>> getAllModule() {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                this.moduleService.getAllModule());
    }
}
