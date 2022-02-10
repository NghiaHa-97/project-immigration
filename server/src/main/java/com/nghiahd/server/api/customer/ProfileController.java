package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.Profile;
import com.nghiahd.server.domain.custom.ProfileQuery;
import com.nghiahd.server.model.ProfileDTO;
import com.nghiahd.server.service.ProfileService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "api/public/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final MessageUtils messageUtils;

    public ProfileController(ProfileService profileService, MessageUtils messageUtil) {
        this.profileService = profileService;
        this.messageUtils = messageUtil;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<BodyResponseDTO<ProfileQuery>> createProfile(@RequestBody ProfileQuery profile) {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                profileService.saveProfile(profile));
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<BodyResponseDTO<ProfileQuery>> editProfile(@RequestBody ProfileQuery profile, @PathVariable UUID id) {
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                profileService.editProfile(profile, id));
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<UUID>> deleteProfile(@PathVariable UUID id) {
        ApiResponseCode apiResponseCode;
        try {
            profileService.deleteProfile(id);
            apiResponseCode = ApiResponseCode.SUCCESS;
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
    public ResponseEntity<BodyResponseDTO<List<ProfileDTO>>> getAllClaims(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "updateDate", direction = Sort.Direction.DESC)
            }) Pageable pageable,
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String projectMissionName,
            @RequestParam(required = false) Integer statusProfileID,
            @RequestParam(required = false) String employeeCreate,
            @RequestParam(required = false) String approver,
            @RequestParam(required = false) LocalDate expirationDate) {

        Page<ProfileDTO> claimsDTOS = profileService.getListProfile(PageUtilsCommon.createPageable(pageable),
                code,
                projectMissionName,
                statusProfileID,
                employeeCreate,
                approver,
                expirationDate);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils, claimsDTOS);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<ProfileQuery>> getDetailByProfile(@PathVariable UUID id) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        ProfileQuery profile = profileService.getProfileByID(id);
        if (profile == null) {
            apiResponseCode = ApiResponseCode.NOT_FOUND;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                profile);
    }

}
