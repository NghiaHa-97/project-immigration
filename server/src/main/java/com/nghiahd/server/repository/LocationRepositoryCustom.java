package com.nghiahd.server.repository;

import com.nghiahd.server.model.LocationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LocationRepositoryCustom {
    List<LocationDTO> getLocationByBounds(Double northEastLat, Double northEastLng, Double southWestLat, Double southWestLng);

    Page<LocationDTO> searchLocation(Pageable pageable, String name);

    LocationDTO getDetailDTO(Long id);
}
