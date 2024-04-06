package com.example.beautyApp.manager;

import com.example.beautyApp.model.Availability;
import com.example.beautyApp.repository.AvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
// import java.util.Optional;

@Service
public class AvailabilityManager {
    @Autowired
    private AvailabilityRepository availabilityRepository;

    // public List<Availability> getAllAvailabilitys() {
    //     return availabilityRepository.findAll();
    // }

    public List<Availability> getAvailabilitiesById(int serviceId) {
        return availabilityRepository.findByAvailabilityServiceId(serviceId);
    }
    
}
