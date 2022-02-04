package com.nghiahd.server.api.admin;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.Role;
import com.nghiahd.server.domain.custom.RoleQuery;
import com.nghiahd.server.service.RoleService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/admin/role")
public class RoleController {
    private final RoleService roleService;
    private final MessageUtils messageUtils;

    public RoleController(RoleService roleService,
                          MessageUtils messageUtils) {
        this.roleService = roleService;
        this.messageUtils = messageUtils;
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<Role>>> getPageRole(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER) Pageable pageable,
            @RequestParam(required = false) String name) {
//        @SortDefault.SortDefaults({
//                @SortDefault(sort = "id", direction = Sort.Direction.DESC)
//        })
        Page<Role> page = roleService.getPageRole(PageUtilsCommon.createPageable(pageable), name);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, page);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<BodyResponseDTO<List<Role>>> getAllRole() {
        List<Role> roles = roleService.getAllRole();
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, roles);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<RoleQuery>> getDetailRole(@PathVariable Integer id) {
        RoleQuery roleQuery = roleService.getDetailRoleByID(id);
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        if (roleQuery == null) {
            apiResponseCode = ApiResponseCode.NOT_FOUND;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils, roleQuery);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<BodyResponseDTO<RoleQuery>> createRole(@RequestBody RoleQuery roleQuery) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        roleQuery = roleService.saveRoleAndPermissionRole(roleQuery, null);
        if (roleQuery == null) {
            apiResponseCode = ApiResponseCode.EXIST;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils, roleQuery);
    }


    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<BodyResponseDTO<RoleQuery>> editRoleAndPermission(@RequestBody RoleQuery roleQuery,
                                                                            @PathVariable Integer id) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        roleQuery = roleService.saveRoleAndPermissionRole(roleQuery, id);
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils, roleQuery);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<Integer>> deleteRole(@PathVariable Integer id) {
        // cần check xem role đã được sử dụng chưa
        ApiResponseCode apiResponseCode;
        try {
            apiResponseCode = this.roleService.deleteRoleAndPermissionRole(id);
        } catch (IllegalArgumentException ex) {
            apiResponseCode = ApiResponseCode.ID_NULL;
        } catch (EmptyResultDataAccessException ex) {
            apiResponseCode = ApiResponseCode.ENTITY_NULL;
        } catch (Exception ex) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils, id);
    }
}
