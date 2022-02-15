package com.nghiahd.server.repository;

import com.nghiahd.server.domain.custom.ProfileQuery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProfileQueryRepository extends JpaRepository<ProfileQuery, UUID>, ProfileQueryRepositoryCustom {
}
