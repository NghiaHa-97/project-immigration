package com.nghiahd.server.service;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.domain.Profile;
import com.nghiahd.server.model.ProfileDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;

public interface ProfileService {
    Profile saveProfile(Profile profile);

    Profile editProfile(Profile profile, UUID id);

    void deleteProfile(UUID id);

    Page<ProfileDTO> getListProfile(Pageable pageable);

    Profile getProfileByID(UUID id);
}
