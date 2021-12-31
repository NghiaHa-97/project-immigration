package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.Experts;
import com.nghiahd.server.model.ExpertsDTO;
import com.nghiahd.server.service.ExpertsService;
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
import java.util.UUID;

@RestController
@RequestMapping(value = "/public/experts")
public class ExpertsController {

    private final ExpertsService expertsService;
    private final MessageUtils messageUtils;

    public ExpertsController(ExpertsService expertsService,
                             MessageUtils messageUtils) {
        this.expertsService = expertsService;
        this.messageUtils = messageUtils;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<BodyResponseDTO<Object>> createExperts(@RequestBody Experts ex) {
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, expertsService.saveExperts(ex));
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> editExperts(@RequestBody Experts experts, @PathVariable UUID id) {
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, expertsService.editExperts(experts, id));
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> deleteExperts(@PathVariable UUID id) {
        // cần check xem đã tồn tại trong hồ sơ thì không đc xóa
        ApiResponseCode apiResponseCode;
        try {
            apiResponseCode = expertsService.deleteExperts(id);
        } catch (IllegalArgumentException ex) {
            apiResponseCode = ApiResponseCode.ID_NULL;
        } catch (EmptyResultDataAccessException ex) {
            apiResponseCode = ApiResponseCode.ENTITY_NULL;
        } catch (Exception ex) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils);
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<ExpertsDTO>>> getPageExperts(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "code", direction = Sort.Direction.DESC)
            }) Pageable pageable) {

        Page<ExpertsDTO> page = expertsService.getPageExperts(PageUtilsCommon.createPageable(pageable));
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, page);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<Experts>> getDetailExperts(@PathVariable UUID id) {
        Experts experts = expertsService.getDetailExperts(id);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, experts);
    }
}
