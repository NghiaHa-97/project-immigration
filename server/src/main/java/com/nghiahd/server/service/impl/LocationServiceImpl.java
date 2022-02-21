package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.Location;
import com.nghiahd.server.model.LocationDTO;
import com.nghiahd.server.repository.LocationRepository;
import com.nghiahd.server.service.LocationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;

    public LocationServiceImpl(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public LocationDTO save(Location request) {
        Location location = this.locationRepository.saveAndFlush(request);
        LocationDTO locationDTO = this.locationRepository.getDetailDTO(location.getId());
        return locationDTO;
    }

    @Override
    public void delete(Long id) {
        this.locationRepository.deleteById(id);
    }

    @Override
    public Location getDetail(Long id) {
        return this.locationRepository.findById(id).orElse(null);
    }

    @Override
    public LocationDTO getDetailDTO(Long id) {
        return this.locationRepository.getDetailDTO(id);
    }

    @Override
    public List<LocationDTO> getLocationByBounds(Double northEastLat, Double northEastLng, Double southWestLat, Double southWestLng) {
        return this.locationRepository.getLocationByBounds(northEastLat,
                northEastLng,
                southWestLat,
                southWestLng);
    }

    @Override
    public Page<LocationDTO> searchLocation(Pageable pageable, String name) {
        return this.locationRepository.searchLocation(pageable, name);
    }
}
