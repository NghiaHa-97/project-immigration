package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Experts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ExpertsRepository extends JpaRepository<Experts, UUID> {
    @Modifying
    @Query(value = "DELETE FROM Experts e WHERE e.id = ?1 ")
    int deleteByExpertsID(UUID id);
}