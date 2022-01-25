package com.nghiahd.server.api.admin;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.SysUser;
import com.nghiahd.server.model.SysUserCustomerDTO;
import com.nghiahd.server.service.SysUserCustomerService;
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
@RequestMapping(value = "api/admin/manage-user")
public class ManageUserController {
    private final SysUserCustomerService sysUserCustomerService;
    private final MessageUtils messageUtils;

    public ManageUserController(SysUserCustomerService sysUserCustomerService,
                                MessageUtils messageUtils) {
        this.sysUserCustomerService = sysUserCustomerService;
        this.messageUtils = messageUtils;
    }

    @GetMapping(value = "/user-customers")
    public ResponseEntity<BodyResponseDTO<List<SysUserCustomerDTO>>> getPageUserCustomers(@PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
                                                                                          @SortDefault.SortDefaults({
                                                                                                  @SortDefault(sort = "createDate", direction = Sort.Direction.DESC)
                                                                                          }) Pageable pageable) {
        Page<SysUserCustomerDTO> page = sysUserCustomerService.getPageSysUserCustomer(PageUtilsCommon.createPageable(pageable));
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                page);

    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<SysUser>> getDetailByID(@PathVariable Integer id) {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                this.sysUserCustomerService.getDetailByID(id));
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<BodyResponseDTO<SysUser>> editByID(@PathVariable Integer id,
                                                             @RequestBody SysUser sysUser) {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                this.sysUserCustomerService.save(id, sysUser));
    }

    @PostMapping(value = "/create")
    public ResponseEntity<BodyResponseDTO<SysUser>> create(@RequestBody SysUser sysUser) {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                this.sysUserCustomerService.save(null, sysUser));
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> delete(@PathVariable Integer id) {
        ApiResponseCode apiResponseCode;
        try {
            apiResponseCode = sysUserCustomerService.delete(id);
        } catch (IllegalArgumentException ex) {
            apiResponseCode = ApiResponseCode.ID_NULL;
        } catch (EmptyResultDataAccessException ex) {
            apiResponseCode = ApiResponseCode.ENTITY_NULL;
        } catch (Exception ex) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils);
    }
}
