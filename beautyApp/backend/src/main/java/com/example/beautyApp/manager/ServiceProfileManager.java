package com.example.beautyApp.manager;

import com.example.beautyApp.model.ServiceProfile;
import com.example.beautyApp.repository.ServiceProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import java.util.List;
import java.util.Optional;

@Service
public class ServiceProfileManager {
    @Autowired
    private ServiceProfileRepository serviceProfileRepository;

    // public List<ServiceProfile> getAllServiceProfiles() {
    //     return serviceProfileRepository.findAll();
    // }

    public Optional<ServiceProfile> getServiceProfileById(int serviceId) {
        return serviceProfileRepository.findByServiceId(serviceId);
    }
    
}