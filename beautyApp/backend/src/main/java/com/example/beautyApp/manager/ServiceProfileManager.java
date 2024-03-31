package com.example.beautyApp.manager;

import com.example.beautyApp.model.ServiceProfile;
import com.example.beautyApp.model.User;
import com.example.beautyApp.repository.ServiceProfileRepository;
import com.example.beautyApp.request.SignUpRequest;

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

    public Optional<ServiceProfile> getServiceProfileByType(String serviceType) {
        return serviceProfileRepository.findByType(serviceType);
    }
    
    public Optional<ServiceProfile> search(String serviceType, String serviceName) {
        System.out.println("serviceType: " + serviceType);
        System.out.println("serviceName: " + serviceName);
        return serviceProfileRepository.findServiceByNameAndType(serviceType, serviceName);
        // if (serviceType.equals("Nails")){
        //     return serviceProfileRepository.findServiceName("Nails", serviceName);  
        // }
        // else if (serviceType.equals("Lash")){
        //     return serviceProfileRepository.findServiceName("Lash", serviceName);
        // }
        

    }
}
