package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.BodyResponseDTO;
import com.nghiahd.server.common.MessageUtils;
import com.nghiahd.server.common.RestResponseWrapper;
import com.nghiahd.server.domain.Department;
import com.nghiahd.server.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/public/department")
public class DepartmentController {
    private final DepartmentService departmentService;
    private final MessageUtils messageUtils;

    public DepartmentController(DepartmentService departmentService,
                              MessageUtils messageUtils) {
        this.departmentService = departmentService;
        this.messageUtils = messageUtils;
    }
    @GetMapping(value = "/work-unit/{id}")
    public ResponseEntity<BodyResponseDTO<List<Department>>> findDepartmentByWorkUnitID(@PathVariable Integer id){
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, departmentService.findDepartmentByWorkUnitID(id));
    }
}
