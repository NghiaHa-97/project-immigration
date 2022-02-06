package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.ProjectMission;
import com.nghiahd.server.model.ProjectMissionDTO;
import com.nghiahd.server.service.ProjectMissionService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/public/project-mission")
public class ProjectMissionController {
    private final ProjectMissionService projectMissionService;
    private final MessageUtils messageUtils;

    public ProjectMissionController(ProjectMissionService projectMissionService,
                                    MessageUtils messageUtils) {
        this.projectMissionService = projectMissionService;
        this.messageUtils = messageUtils;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<BodyResponseDTO<ProjectMission>> createProfile(@RequestBody ProjectMission projectMission) {
        ProjectMission entity = null;
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        if (this.projectMissionService.checkNotNullWorkUnitIDAndEmployeeID()) {
            entity = this.projectMissionService.saveProjectMission(projectMission);
        } else {
            apiResponseCode = ApiResponseCode.WORK_UNIT_OR_EMPLOYEE_NULL;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils, entity);
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<BodyResponseDTO<ProjectMission>> editProjectMission(@RequestBody ProjectMission projectMission,
                                                                              @PathVariable Integer id) {
        ProjectMission entity = null;
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;

        if (id != null) {
            if(this.projectMissionService.checkNotNullWorkUnitIDAndEmployeeID()){
                entity = this.projectMissionService.editProjectMission(projectMission, id);
            }else {
                apiResponseCode = ApiResponseCode.WORK_UNIT_OR_EMPLOYEE_NULL;
            }
        } else {
            apiResponseCode = ApiResponseCode.ID_NULL;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                entity);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<Integer>> deleteProjectMission(@PathVariable Integer id) {
        ApiResponseCode apiResponseCode;
        try {
            apiResponseCode = projectMissionService.deleteProjectMission(id);
        } catch (IllegalArgumentException ex) {
            apiResponseCode = ApiResponseCode.ID_NULL;
        } catch (EmptyResultDataAccessException ex) {
            apiResponseCode = ApiResponseCode.ENTITY_NULL;
        } catch (Exception ex) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils, id);
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<ProjectMissionDTO>>> getAllClaims(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "updateDate", direction = Sort.Direction.DESC)
            }) Pageable pageable,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String workUnitCreateName,
            @RequestParam(required = false) String employeeName,
            @RequestParam(required = false) String employeeCode) {

        Page<ProjectMissionDTO> claimsDTOS = this.projectMissionService.getListProjectMission(
                PageUtilsCommon.createPageable(pageable),
                name,
                workUnitCreateName,
                employeeName,
                employeeCode);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, claimsDTOS);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<ProjectMission>> getDetailByProfile(@PathVariable Integer id) {
        ProjectMission projectMission = this.projectMissionService.getProjectMissionByID(id);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, projectMission);
    }

}
