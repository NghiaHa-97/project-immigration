package com.nghiahd.server.service;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.ProjectMission;
import com.nghiahd.server.model.ProjectMissionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjectMissionService {
    List<ProjectMission> findProjectMissionByWorkUnitCreateID(int workUnitCreateID);

    ProjectMission saveProjectMission(ProjectMission projectMission);

    ProjectMission editProjectMission(ProjectMission projectMission, Integer id);

    ApiResponseCode deleteProjectMission(Integer id);

    ProjectMission getProjectMissionByID(Integer id);

    Page<ProjectMissionDTO> getListProjectMission(Pageable pageable,
                                                  String name,
                                                  String workUnitCreateName,
                                                  String employeeName,
                                                  String employeeCode);
}
