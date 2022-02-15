package com.nghiahd.server.repository.impl;

import com.nghiahd.server.domain.custom.ProfileQuery;
import com.nghiahd.server.repository.ProfileQueryRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class ProfileQueryRepositoryImpl implements ProfileQueryRepositoryCustom {
    @Autowired
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void refresh(ProfileQuery profileSaved) {
        this.entityManager.refresh(profileSaved);
    }
}
