package com.nghiahd.server.repository;

import com.nghiahd.server.model.ProjectMissionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectMissionRepositoryCustom {
    Page<ProjectMissionDTO> getListProjectMission(Pageable pageable,
                                                  String name,
                                                  String workUnitCreateName,
                                                  String employeeName,
                                                  String employeeCode);
}
