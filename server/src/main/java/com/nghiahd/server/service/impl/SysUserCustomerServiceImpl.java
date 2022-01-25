package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.SysUser;
import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.repository.SysUserCustomerRepository;
import com.nghiahd.server.service.SysUserCustomerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class SysUserCustomerServiceImpl implements SysUserCustomerService {
    private final SysUserCustomerRepository sysUserCustomerRepository;

    public SysUserCustomerServiceImpl(SysUserCustomerRepository sysUserCustomerRepository) {
        this.sysUserCustomerRepository = sysUserCustomerRepository;
    }

    @Override
    public Page<SysUserCustomerDTO> getPageSysUserCustomer(Pageable pageable) {
        return this.sysUserCustomerRepository.customerDTOPage(pageable);
    }

    @Override
    public SysUser getDetailByID(Integer id) {
        return this.sysUserCustomerRepository.findById(id).orElse(null);
    }

    @Override
    public SysUser save(Integer id, SysUser sysUser) {
        if (id == null) {
            sysUser.setCreateDate(LocalDateTime.now());
        }
        sysUser.setUpdateDate(LocalDateTime.now());
        return this.sysUserCustomerRepository.save(sysUser);
    }

    @Override
    public ApiResponseCode delete(Integer id) {
        this.sysUserCustomerRepository.deleteById(id);
        return ApiResponseCode.SUCCESS;
    }
}
