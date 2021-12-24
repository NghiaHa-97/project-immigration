package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.Profile;
import com.nghiahd.server.repository.ProfileRepository;
import com.nghiahd.server.service.ProfileService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public Profile saveProfile(Profile profile) {
        profile.setCreateDate(LocalDateTime.now());
        profile.setUpdateDate(LocalDateTime.now());
        return profileRepository.save(profile);
    }

    @Override
    public Profile editProfile(Profile profile, UUID id) {
        profile.setUpdateDate(LocalDateTime.now());
        Optional<Profile> pro = profileRepository.findById(id);
        if (pro.isPresent()){
            return profileRepository.save(profile);
        }
        return null;
    }

    @Override
    public int deleteProfile(UUID id) {
        return profileRepository.deleteByProfileID(id);
    }
}
