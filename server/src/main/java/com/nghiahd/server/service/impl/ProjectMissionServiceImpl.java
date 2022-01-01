package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.ProjectMission;
import com.nghiahd.server.repository.ProjectMissionRepository;
import com.nghiahd.server.service.ProjectMissionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectMissionServiceImpl implements ProjectMissionService {

    private final ProjectMissionRepository projectMissionRepository;

    public ProjectMissionServiceImpl(ProjectMissionRepository projectMissionRepository) {
        this.projectMissionRepository = projectMissionRepository;
    }

    @Override
    public List<ProjectMission> findProjectMissionByWorkUnitCreateID(int workUnitCreateID) {
        return projectMissionRepository.findProjectMissionByWorkUnitCreateID(workUnitCreateID);
    }
}
