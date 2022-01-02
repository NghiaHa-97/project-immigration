package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.Profile;
import com.nghiahd.server.domain.custom.ProfileCustom;
import com.nghiahd.server.model.ProfileDTO;
import com.nghiahd.server.repository.ProfileCustomRepository;
import com.nghiahd.server.repository.ProfileRepository;
import com.nghiahd.server.service.ProfileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;
    private final ProfileCustomRepository profileCustomRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository,
                              ProfileCustomRepository profileCustomRepository) {
        this.profileRepository = profileRepository;
        this.profileCustomRepository = profileCustomRepository;
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
        if (pro.isPresent()) {
            return profileRepository.save(profile);
        }
        return null;
    }

    @Override
    public void deleteProfile(UUID id) {
        profileRepository.deleteById(id);
    }

    @Override
    public Page<ProfileDTO> getListProfile(Pageable pageable) {
        Page<ProfileDTO> listProfile = profileRepository.getListProfile(pageable);
        return listProfile;
    }

    @Override
    public Profile getProfileByID(UUID id) {

        Profile op = profileRepository.findById(id).orElse(null);
//        lazy load
//        if (op != null) {

//            op.setExpertsInProfiles(null);
//            op.setEmployeeInProfiles(null);
//        }
        return op;
    }
}
