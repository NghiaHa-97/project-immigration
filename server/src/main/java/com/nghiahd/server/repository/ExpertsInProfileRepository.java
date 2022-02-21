package com.nghiahd.server.repository;

import com.nghiahd.server.domain.custom.ExpertsInProfileKey;
import com.nghiahd.server.domain.custom.ExpertsInProfileQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ExpertsInProfileRepository extends JpaRepository<ExpertsInProfileQuery, ExpertsInProfileKey> {
    @Modifying
    @Query(value = "DELETE " +
            " FROM ExpertsInProfile " +
            " WHERE ProfileID = ?1 and ExpertsID not in (?2) ", nativeQuery = true)
    void deleteByProfile(UUID profileID, List<UUID> ex);

    @Modifying
    @Query(value = "DELETE " +
            " FROM ExpertsInProfile " +
            " WHERE ProfileID = ?1  ", nativeQuery = true)
    void deleteByProfile(UUID profileID);
}
