package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Experts;
import com.nghiahd.server.model.ExpertsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ExpertsRepository extends JpaRepository<Experts, UUID>, ExpertsRepositoryCustom {
    @Modifying
    @Query(value = "DELETE FROM Experts e WHERE e.id = ?1 ")
    int deleteByExpertsID(UUID id);

    @Query(value = "select count(1) FROM ExpertsInProfile e WHERE e.ExpertsID = ?1 ", nativeQuery = true)
    int checkExistExpertsInProfile(UUID id);

}