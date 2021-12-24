package com.nghiahd.server.service;

import com.nghiahd.server.domain.Profile;

import java.util.UUID;

public interface ProfileService {
    Profile saveProfile(Profile profile);

    Profile editProfile(Profile profile, UUID id);

    int deleteProfile(UUID id);
}
