package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.AssignTasks;
import com.nghiahd.server.model.AssignTasksDTO;
import com.nghiahd.server.service.AssignTasksService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(value = "api/public/assign-tasks")
public class AssignTasksController {
    private final MessageUtils messageUtils;
    private final AssignTasksService assignTasksService;

    public AssignTasksController(MessageUtils messageUtils,
                                 AssignTasksService assignTasksService) {
        this.messageUtils = messageUtils;
        this.assignTasksService = assignTasksService;
    }

    Logger log = LoggerFactory.getLogger(AssignTasksController.class);

    private void logHttpRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();
        log.info("Uri: " + uri);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<BodyResponseDTO<AssignTasks>> createTaskForDepartment(@RequestBody AssignTasks req,
                                                                                HttpServletRequest request) {
        logHttpRequest(request);
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        AssignTasks assignTasks = null;
        try{
            assignTasks = this.assignTasksService.save(req);
            if (assignTasks == null) {
                apiResponseCode = ApiResponseCode.SAVE_FAILED;
            }
        }catch (ExceptionApiCustom ex){
            apiResponseCode = ex.getRestError();
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                assignTasks);
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> editTaskForDepartment(@RequestBody AssignTasks req,
                                                                         @PathVariable UUID id,
                                                                         HttpServletRequest request) {
        logHttpRequest(request);
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        AssignTasks assignTasks = null;
        try {
            assignTasks = this.assignTasksService.edit(req, id);
            if (assignTasks == null) {
                apiResponseCode = ApiResponseCode.SAVE_FAILED;
            }
        }catch (ExceptionApiCustom ex){
            apiResponseCode = ex.getRestError();
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                assignTasks);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> deleteTaskForDepartment(@PathVariable UUID id,
                                                                           HttpServletRequest request) {
        logHttpRequest(request);
        ApiResponseCode apiResponseCode;
        try {
            apiResponseCode = this.assignTasksService.deleteByID(id);
        } catch (IllegalArgumentException ex) {
            apiResponseCode = ApiResponseCode.ID_NULL;
        } catch (EmptyResultDataAccessException ex) {
            apiResponseCode = ApiResponseCode.ENTITY_NULL;
        } catch (Exception ex) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                id);
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<AssignTasksDTO>>> getAllTaskForDepartment(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "updateDate", direction = Sort.Direction.DESC)
            }) Pageable pageable,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String employeeCode,
            @RequestParam(required = false) String employeeFullname,
            @RequestParam(required = false) String departmentName,
            @RequestParam(required = false) String profileCode,
            @RequestParam(required = false) Integer statusProfileID,
            @RequestParam(required = false) LocalDate expirationDate
    ) {

        Page<AssignTasksDTO> dto = assignTasksService.getPageAssignTasks(
                PageUtilsCommon.createPageable(pageable),
                title,
                employeeCode,
                employeeFullname,
                departmentName,
                profileCode,
                statusProfileID,
                expirationDate
        );
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                dto);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<AssignTasksDTO>> getDetailByTaskForAssistant(@PathVariable UUID id) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        AssignTasksDTO assignTasksDTO = this.assignTasksService.getDetailByID(id);

        if (assignTasksDTO == null) {
            apiResponseCode = ApiResponseCode.NOT_FOUND;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                assignTasksDTO);
    }

}
