package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ProfileRepository extends JpaRepository<Profile, UUID>, ProfileRepositoryCustom {
    @Modifying
    @Query(value = "DELETE FROM Profile e WHERE e.id = ?1 ")
    int deleteByProfileID(UUID id);
}
