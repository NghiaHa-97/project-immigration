package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.AuthenticationCommon;
import com.nghiahd.server.common.ExceptionApiCustom;
import com.nghiahd.server.domain.AssignTasks;
import com.nghiahd.server.model.AssignTasksDTO;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.repository.AssignTasksRepository;
import com.nghiahd.server.service.AssignTasksService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
public class AssignTasksServiceImpl implements AssignTasksService {
    private final AssignTasksRepository assignTasksRepository;

    public AssignTasksServiceImpl(AssignTasksRepository assignTasksRepository) {
        this.assignTasksRepository = assignTasksRepository;
    }

    @Override
    public Page<AssignTasksDTO> getPageAssignTasks(Pageable pageable) {
        return this.assignTasksRepository.getPageAssignTasks(pageable);
    }

    @Override
    public AssignTasksDTO getDetailByID(UUID id) {
        return this.assignTasksRepository.getDetailByID(id);
    }

    @Override
    public AssignTasks save(AssignTasks assignTasks) throws ExceptionApiCustom {
        if (assignTasks.getEmployeeID() == null && assignTasks.getDepartmentID() == null) {
            throw new ExceptionApiCustom(ApiResponseCode.EMPLOYEE_DEPARTMENT_NULL);
        } else if (assignTasks.getEmployeeID() != null && assignTasks.getDepartmentID() != null) {
            throw new ExceptionApiCustom(ApiResponseCode.EMPLOYEE_DEPARTMENT_COEXIST);
        }
        assignTasks.setCreateDate(LocalDateTime.now());
        assignTasks.setUpdateDate(LocalDateTime.now());
        UserLogin userLogin = AuthenticationCommon.getUserLoginContext();
        assignTasks.setEmployeeCreateID(userLogin.getEmployeeID());
        return this.assignTasksRepository.save(assignTasks);
    }

    @Override
    public AssignTasks edit(AssignTasks assignTasks, UUID id) throws ExceptionApiCustom {
        AssignTasks val = this.assignTasksRepository.getById(id);
        if (LocalDateTime.now().isBefore(val.getExpirationDate())) {
            throw new ExceptionApiCustom(ApiResponseCode.EXPIRATION_DATE);
        }
        UserLogin userLogin = AuthenticationCommon.getUserLoginContext();

        if (val.getEmployeeID() == userLogin.getEmployeeID()) {
            val.setResult(assignTasks.getResult());
            val.setUpdateDate(LocalDateTime.now());
        } else if (val.getEmployeeCreateID() == userLogin.getEmployeeID()) {
            val.setTitle(assignTasks.getTitle());
            val.setEmployeeID(assignTasks.getEmployeeID());
            val.setDepartmentID(assignTasks.getDepartmentID());
            val.setProfileID(assignTasks.getProfileID());
            val.setDescription(assignTasks.getDescription());
            val.setExpirationDate(assignTasks.getExpirationDate());
            val.setUpdateDate(LocalDateTime.now());
        }
        return this.assignTasksRepository.save(val);
    }

    @Override
    public ApiResponseCode deleteByID(UUID id) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        this.assignTasksRepository.deleteById(id);
        return apiResponseCode;
    }


}
