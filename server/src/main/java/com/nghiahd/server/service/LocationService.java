package com.nghiahd.server.service;

import com.nghiahd.server.domain.Location;
import com.nghiahd.server.model.LocationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LocationService {
    LocationDTO save(Location request);
    void delete(Long id);
    Location getDetail(Long id);
    LocationDTO getDetailDTO(Long id);
    List<LocationDTO> getLocationByBounds(Double northEastLat,
                                          Double northEastLng,
                                          Double southWestLat,
                                          Double southWestLng);

    Page<LocationDTO> searchLocation(Pageable pageable, String name);
}
