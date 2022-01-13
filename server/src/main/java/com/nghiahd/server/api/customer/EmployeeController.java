package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.common.mapper.ObjectMapperUtils;
import com.nghiahd.server.domain.Employee;
import com.nghiahd.server.model.EmployeeDTO;
import com.nghiahd.server.service.EmployeeService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/public/employee")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final MessageUtils messageUtils;

    public EmployeeController(EmployeeService employeeService,
                              MessageUtils messageUtils) {
        this.employeeService = employeeService;
        this.messageUtils = messageUtils;
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<EmployeeDTO>>> getPageEmployee(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "code", direction = Sort.Direction.DESC)
            }) Pageable pageable) {
        Page<EmployeeDTO> page = employeeService.getPageEmployee(PageUtilsCommon.createPageable(pageable));
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, page);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<Employee>> getDetailEmployee(@PathVariable UUID id) {
        Employee employee = employeeService.getDetailEmployee(id);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, employee);
    }

//    @PostMapping(value = "/create")
//    public ResponseEntity<BodyResponseDTO<Employee>> createEmployee(@RequestBody Employee em) {
//        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, employeeService.createEmployee(em));
//    }

    @PostMapping(value = "/create",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BodyResponseDTO<Employee>> createEmployee(@RequestPart("employee") String em,
                                                                    @RequestPart(value = "file", required = false) MultipartFile file) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        Employee employee = ObjectMapperUtils.convertJsonToObject(em, Employee.class);
        Employee employeeSaved = null;
        if(employee != null){
            employeeSaved = this.employeeService.createEmployee(employee, file);
        }else{
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        if (employeeSaved == null){
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils, employee);
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<BodyResponseDTO<Employee>> editEmployee(@RequestPart("employee") String em,
                                                                  @RequestPart(value = "file", required = false) MultipartFile file,
                                                                  @PathVariable UUID id) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        Employee employee = ObjectMapperUtils.convertJsonToObject(em, Employee.class);
        Employee employeeSaved = null;
        if(employee != null){
            employeeSaved = this.employeeService.editEmployee(employee, file, id);
        }else{
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        if (employeeSaved == null){
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),apiResponseCode, this.messageUtils, employeeSaved);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> deleteEmployee(@PathVariable UUID id) {
        // cần check xem đã tồn tại trong hồ sơ thì không đc xóa
        ApiResponseCode apiResponseCode;
        try {
            apiResponseCode = employeeService.deleteEmployee(id);
        } catch (IllegalArgumentException ex) {
            apiResponseCode = ApiResponseCode.ID_NULL;
        } catch (EmptyResultDataAccessException ex) {
            apiResponseCode = ApiResponseCode.ENTITY_NULL;
        } catch (Exception ex) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils);
    }


}
