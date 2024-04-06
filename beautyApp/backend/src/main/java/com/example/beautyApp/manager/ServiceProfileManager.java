package com.example.beautyApp.manager;

import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.model.Review;
import com.example.beautyApp.model.ServiceProfile;
//import com.example.beautyApp.model.User;
import com.example.beautyApp.repository.ServiceProfileRepository;
//import com.example.beautyApp.request.SignUpRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    
    public List<ServiceProfile> search(String serviceType, String serviceName) {
        System.out.println("serviceType1: " + serviceType);
        System.out.println("serviceName1: " + serviceName);
        System.out.println(serviceProfileRepository.findByNameAndType(serviceType, serviceName));
        return serviceProfileRepository.findByNameAndType(serviceType, serviceName);
        // if (serviceType.equals("Nails")){
        //     return serviceProfileRepository.findServiceName("Nails", serviceName);  
        // }
        // else if (serviceType.equals("Lash")){
        //     return serviceProfileRepository.findServiceName("Lash", serviceName);
        // }
        

    public List<Pricing> getAllPricingsByServiceId(int serviceId) {
        return serviceProfileRepository.findPricingsByServiceId(serviceId);
    }


    public List<Review> getAllReviewsByServiceId(int serviceId) {
        return serviceProfileRepository.findReviewsByServiceId(serviceId);
    }
}
