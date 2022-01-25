package com.nghiahd.server.repository;

import com.nghiahd.server.model.SysUserCustomerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SysUserCustomerRepositoryCustom {
    Page<SysUserCustomerDTO> customerDTOPage(Pageable pageable);
}
