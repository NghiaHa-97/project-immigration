package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.ExceptionApiCustom;
import com.nghiahd.server.common.SaveFileUtils;
import com.nghiahd.server.config.ReadEnvironment;
import com.nghiahd.server.domain.Employee;
import com.nghiahd.server.model.EmployeeDTO;
import com.nghiahd.server.repository.EmployeeRepository;
import com.nghiahd.server.service.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final ReadEnvironment readEnvironment;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                               ReadEnvironment readEnvironment) {
        this.employeeRepository = employeeRepository;
        this.readEnvironment = readEnvironment;
    }

    @Override
    public Page<EmployeeDTO> getPageEmployee(Pageable pageable,
                                             String code,
                                             String fullname,
                                             String workUnitName,
                                             String cityProvinceName,
                                             String phoneNumber,
                                             String numberIdentityCard) {
        return employeeRepository.getPageEmployee(pageable,
                code,
                fullname,
                workUnitName,
                cityProvinceName,
                phoneNumber,
                numberIdentityCard);
    }

    @Override
    public Employee getDetailEmployee(UUID id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Employee createEmployee(Employee em, MultipartFile fileImage) {
        em.setCreateDate(LocalDateTime.now());
        em.setUpdateDate(LocalDateTime.now());
        em.setId(UUID.randomUUID());
        if (fileImage != null) {
            String fileDir = this.readEnvironment.getFolderImages() + "/" + em.getId();
            String fileName = SaveFileUtils.createNameFile(em.getUpdateDate().toString(), Objects.requireNonNull(fileImage.getOriginalFilename()));
            boolean isSaved = SaveFileUtils.saveFile(fileDir, fileName, fileImage);
            if (isSaved) {
                em.setAvatar(fileDir + "/" + fileName);
                em = employeeRepository.saveAndFlush(em);
                this.employeeRepository.refresh(em);
            } else {
                em = null;
            }
        } else {
            em = null;
        }
        return em;
    }

    @Override
    public Employee editEmployee(Employee employee, MultipartFile fileImage, UUID id) {
        employee.setUpdateDate(LocalDateTime.now());
        Optional<Employee> pro = employeeRepository.findById(id);
        if (pro.isPresent()) {
            if (fileImage != null) {
                String fileDir = this.readEnvironment.getFolderImages() + "/" + employee.getId();
                String fileName = SaveFileUtils.createNameFile(employee.getUpdateDate().toString(), Objects.requireNonNull(fileImage.getOriginalFilename()));
                boolean isSaved = SaveFileUtils.saveFile(fileDir, fileName, fileImage);
                if (isSaved) {
                    employee.setAvatar(fileDir + "/" + fileName);
                } else {
                    return null;
                }
            }
            return employeeRepository.save(employee);
        }
        return null;
    }

    @Override
    public ApiResponseCode deleteEmployee(UUID id) {
        if (employeeRepository.checkExistEmployeeInProfile(id) > 0) {
            return ApiResponseCode.EXIST_RELATION;
        }
        employeeRepository.deleteById(id);
        return ApiResponseCode.SUCCESS;
    }
}
