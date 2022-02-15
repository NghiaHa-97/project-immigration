package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.AuthenticationCommon;
import com.nghiahd.server.domain.ProjectMission;
import com.nghiahd.server.model.ProjectMissionDTO;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.repository.ProjectMissionRepository;
import com.nghiahd.server.service.ProjectMissionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ProjectMissionServiceImpl implements ProjectMissionService {

    private final ProjectMissionRepository projectMissionRepository;

    public ProjectMissionServiceImpl(ProjectMissionRepository projectMissionRepository) {
        this.projectMissionRepository = projectMissionRepository;
    }

    @Override
    public List<ProjectMission> findProjectMissionByWorkUnitCreateID(int workUnitCreateID) {
        return projectMissionRepository.findProjectMissionByWorkUnitCreateID(workUnitCreateID);
    }

    @Override
    public ProjectMission saveProjectMission(ProjectMission projectMission) {
        UserLogin userLogin = AuthenticationCommon.getUserLoginContext();
        projectMission.setWorkUnitCreateID(userLogin.getWorkUnitID());
        projectMission.setEmployeeID(userLogin.getEmployeeID());
        projectMission.setCreateDate(LocalDateTime.now());
        projectMission.setUpdateDate(LocalDateTime.now());

        return this.projectMissionRepository.save(projectMission);
    }

    @Override
    public ProjectMission editProjectMission(ProjectMission projectMission, Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserLogin userLogin = ((UserLogin) authentication.getPrincipal());

        ProjectMission entity = this.projectMissionRepository.getById(id);
        if (entity != null) {
            entity.setUpdateDate(LocalDateTime.now());
            entity.setDescription(projectMission.getDescription());
            entity.setName(projectMission.getName());
            entity.setWorkUnitCreateID(userLogin.getWorkUnitID());
            entity.setEmployeeID(userLogin.getEmployeeID());
        }

        return this.projectMissionRepository.save(entity);
    }

    @Override
    public ApiResponseCode deleteProjectMission(Integer id) {
        if (projectMissionRepository.checkExistMissionInProfile(id) > 0) {
            return ApiResponseCode.EXIST_RELATION;
        }
        projectMissionRepository.deleteById(id);
        return ApiResponseCode.SUCCESS;
    }

    @Override
    public ProjectMission getProjectMissionByID(Integer id) {
        return this.projectMissionRepository.findById(id).orElse(null);
    }

    @Override
    public Page<ProjectMissionDTO> getListProjectMission(Pageable pageable,
                                                         String name,
                                                         String workUnitCreateName,
                                                         String employeeName,
                                                         String employeeCode) {
        return this.projectMissionRepository.getListProjectMission(pageable,
                name,
                workUnitCreateName,
                employeeName,
                employeeCode);
    }
}
