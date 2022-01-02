package com.nghiahd.server.repository;

import com.nghiahd.server.domain.custom.ProfileCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProfileCustomRepository extends JpaRepository<ProfileCustom, UUID> {
}
