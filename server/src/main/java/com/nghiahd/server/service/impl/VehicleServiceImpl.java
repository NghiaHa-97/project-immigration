package com.nghiahd.server.service.impl;

import com.nghiahd.server.domain.Vehicle;
import com.nghiahd.server.repository.VehicleRepository;
import com.nghiahd.server.service.VehicleService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public List<Vehicle> getAllVehicle() {
        return vehicleRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
