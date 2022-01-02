package com.nghiahd.server.api.customer;

import com.nghiahd.server.api.admin.UserController;
import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.TaskForDepartment;
import com.nghiahd.server.model.TaskForDepartmentDTO;
import com.nghiahd.server.service.TaskForDepartmentService;
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
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/public/task-for-department")
public class TaskForDepartmentController {

    private final TaskForDepartmentService taskForDepartmentService;
    private final MessageUtils messageUtils;

    public TaskForDepartmentController(TaskForDepartmentService taskForDepartmentService, MessageUtils messageUtils) {
        this.taskForDepartmentService = taskForDepartmentService;
        this.messageUtils = messageUtils;
    }

    Logger log = LoggerFactory.getLogger(UserController.class);

    private void logHttpRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();
        log.info(uri + " register user admin");
    }

    @PostMapping(value = "/create")
    public ResponseEntity<BodyResponseDTO<Object>> createTaskForDepartment(@RequestBody TaskForDepartment req, HttpServletRequest request) {
        logHttpRequest(request);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, taskForDepartmentService.saveTFD(req));
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> editTaskForDepartment(@RequestBody TaskForDepartment req, @PathVariable UUID id, HttpServletRequest request) {
        logHttpRequest(request);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, taskForDepartmentService.editTFD(req, id));
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> deleteTaskForDepartment(@PathVariable UUID id, HttpServletRequest request) {
        logHttpRequest(request);
        ApiResponseCode apiResponseCode;
        try {
            taskForDepartmentService.deleteTFD(id);
            apiResponseCode = ApiResponseCode.SUCCESS;
        } catch (IllegalArgumentException ex) {
            apiResponseCode = ApiResponseCode.ID_NULL;
        } catch (EmptyResultDataAccessException ex) {
            apiResponseCode = ApiResponseCode.ENTITY_NULL;
        } catch (Exception ex) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils);
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<TaskForDepartmentDTO>>> getAllTaskForDepartment(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "createDate", direction = Sort.Direction.DESC)
            }) Pageable pageable) {

        Page<TaskForDepartmentDTO> claimsDTOS = taskForDepartmentService.getListTFD(PageUtilsCommon.createPageable(pageable));
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, claimsDTOS);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> getDetailByTaskForDepartment(@PathVariable UUID id){
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, taskForDepartmentService.getTFDByID(id));
    }

}
