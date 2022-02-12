package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.common.mapper.ObjectMapperUtils;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "api/public/experts")
public class ExpertsController {

    private final ExpertsService expertsService;
    private final MessageUtils messageUtils;

    public ExpertsController(ExpertsService expertsService,
                             MessageUtils messageUtils) {
        this.expertsService = expertsService;
        this.messageUtils = messageUtils;
    }

    @PostMapping(value = "/create",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BodyResponseDTO<Experts>> createExperts(
            @RequestPart("expert") String ex,
            @RequestPart(value = "passportImage", required = false) MultipartFile passportImage,
            @RequestPart(value = "portraitPhotography", required = false) MultipartFile portraitPhotography) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        Experts experts = ObjectMapperUtils.convertJsonToObject(ex, Experts.class);
        Experts expertsSaved = null;
        if (experts != null) {
            expertsSaved = this.expertsService.createExperts(experts, passportImage, portraitPhotography);
        } else {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        if (expertsSaved == null) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }
        return RestResponseWrapper.getResponse(
                apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                expertsSaved);
    }

    @PutMapping(value = "/edit/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BodyResponseDTO<Object>> editExperts(
            @RequestPart("expert") String ex,
            @RequestPart(value = "passportImage", required = false) MultipartFile passportImage,
            @RequestPart(value = "portraitPhotography", required = false) MultipartFile portraitPhotography,
            @PathVariable UUID id
    ) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        Experts experts = ObjectMapperUtils.convertJsonToObject(ex, Experts.class);
        Experts expertsSaved = null;
        if (experts != null) {
            expertsSaved = this.expertsService.editExperts(experts, passportImage, portraitPhotography, id);
        } else {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        if (expertsSaved == null) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(
                apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                expertsSaved
        );
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<UUID>> deleteExperts(@PathVariable UUID id) {
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

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(), apiResponseCode, this.messageUtils, id);
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<ExpertsDTO>>> getPageExperts(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "updateDate", direction = Sort.Direction.DESC)
            }) Pageable pageable,
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String fullname,
            @RequestParam(required = false) String countryName,
            @RequestParam(required = false) String permanentResidentialAddress,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String passportNumber) {

        Page<ExpertsDTO> page = expertsService.getPageExperts(
                PageUtilsCommon.createPageable(pageable),
                code,
                fullname,
                countryName,
                permanentResidentialAddress,
                phoneNumber,
                passportNumber);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, page);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<Experts>> getDetailExperts(@PathVariable UUID id) {
        Experts experts = expertsService.getDetailExperts(id);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, experts);
    }
}
