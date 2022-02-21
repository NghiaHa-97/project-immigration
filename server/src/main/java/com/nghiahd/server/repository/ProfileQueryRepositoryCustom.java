package com.nghiahd.server.repository;

import com.nghiahd.server.domain.custom.ProfileQuery;

public interface ProfileQueryRepositoryCustom {
    void refresh(ProfileQuery profileSaved);
    ProfileQuery create(ProfileQuery profileQuery);
}
