package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.AuthenticationCommon;
import com.nghiahd.server.domain.Profile;
import com.nghiahd.server.domain.StatusProfile;
import com.nghiahd.server.domain.custom.EmployeeQuery;
import com.nghiahd.server.domain.custom.ProfileQuery;
import com.nghiahd.server.model.ProfileDTO;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.repository.ProfileQueryRepository;
import com.nghiahd.server.repository.ProfileRepository;
import com.nghiahd.server.service.ProfileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;
    private final ProfileQueryRepository profileQueryRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository,
                              ProfileQueryRepository profileQueryRepository) {
        this.profileRepository = profileRepository;
        this.profileQueryRepository = profileQueryRepository;
    }

    @Override
    public ProfileQuery saveProfile(ProfileQuery profile) {
        profile.setCreateDate(LocalDateTime.now());
        profile.setUpdateDate(LocalDateTime.now());
        UserLogin userLogin = AuthenticationCommon.getUserLoginContext();
        profile.setStatusProfile(new StatusProfile(1));
        profile.setEmployeeCreate(new EmployeeQuery(userLogin.getEmployeeID()));
        profile.setId(UUID.randomUUID());
        return profileQueryRepository.save(profile);
    }

    @Override
    public ProfileQuery editProfile(ProfileQuery profile, UUID id) {
        profile.setUpdateDate(LocalDateTime.now());
//        Optional<Profile> pro = profileRepository.findById(id);
        Optional<Profile> pro = profileRepository.findById(id);
        if (pro.isPresent()) {
            profile.setStatusProfile(new StatusProfile(1));
            profile.setCreateDate(pro.get().getCreateDate());
            UserLogin userLogin = AuthenticationCommon.getUserLoginContext();
            profile.setEmployeeCreate(new EmployeeQuery(userLogin.getEmployeeID()));
            return profileQueryRepository.save(profile);
        }
        return null;
    }

    @Override
    public void deleteProfile(UUID id) {
        profileRepository.deleteById(id);
    }

    @Override
    public Page<ProfileDTO> getListProfile(Pageable pageable,
                                           String code,
                                           String projectMissionName,
                                           Integer statusProfileID,
                                           String employeeCreate,
                                           String approver,
                                           LocalDate expirationDate) {
        Page<ProfileDTO> listProfile = profileRepository.getListProfile(pageable,
                code,
                projectMissionName,
                statusProfileID,
                employeeCreate,
                approver,
                expirationDate);
        return listProfile;
    }

    @Override
    public ProfileQuery getProfileByID(UUID id) {
        ProfileQuery op = profileQueryRepository.findById(id).orElse(null);
        return op;
    }
}
