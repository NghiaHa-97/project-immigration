package com.nghiahd.server.service;

import com.nghiahd.server.domain.ProjectMission;

import java.util.List;

public interface ProjectMissionService {
    List<ProjectMission> findProjectMissionByWorkUnitCreateID(int workUnitCreateID);
}
