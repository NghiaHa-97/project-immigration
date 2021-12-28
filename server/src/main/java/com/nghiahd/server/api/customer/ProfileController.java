package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.Profile;
import com.nghiahd.server.model.ProfileDTO;
import com.nghiahd.server.service.ProfileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "/public/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final MessageUtils messageUtils;

    public ProfileController(ProfileService profileService, MessageUtils messageUtil) {
        this.profileService = profileService;
        this.messageUtils = messageUtil;
    }

    @PostMapping(value = "/create-profile")
    public ResponseEntity<BodyResponseDTO<Object>> createProfile(@RequestBody Profile profile) {
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils,profileService.saveProfile(profile));
    }

    @PutMapping(value = "/edit-profile/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> editProfile(@RequestBody Profile profile, @PathVariable UUID id) {
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils,profileService.editProfile(profile, id));
    }

    @DeleteMapping(value = "/delete-profile/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> deleteProfile(@PathVariable UUID id) {
        int checkDelete = profileService.deleteProfile(id);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils,checkDelete != 0);
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<ProfileDTO>> getAllClaims(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "createdate", direction = Sort.Direction.DESC)}) Pageable pageable
            ) {
        Page<ProfileDTO> claimsDTOS = profileService.getListProfile(pageable);
        return RestResponseWrapper.getResponse(HttpStatus.OK, ApiResponseCode.SUCCESS, this.messageUtils,claimsDTOS);
    }

}
