package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long>, LocationRepositoryCustom {
}
