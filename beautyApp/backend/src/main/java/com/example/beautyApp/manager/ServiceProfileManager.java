package com.example.beautyApp.manager;

import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.model.Review;
import com.example.beautyApp.model.ServiceProfile;
import com.example.beautyApp.repository.PricingRepository;
import com.example.beautyApp.repository.ServiceProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceProfileManager {
    @Autowired
    private ServiceProfileRepository serviceProfileRepository;
    @Autowired
    private PricingRepository pricingRepository;

    // public List<ServiceProfile> getAllServiceProfiles() {
    //     return serviceProfileRepository.findAll();
    // }

    public Optional<ServiceProfile> getServiceProfileById(int serviceId) {
        return serviceProfileRepository.findByServiceId(serviceId);
    }

    public Optional<ServiceProfile> findServiceId(ServiceProfile s) {
        return serviceProfileRepository.findByServiceLocationAndServiceTypeAndServiceDescriptionAndServiceName(s.getServiceLocation(), s.getServiceType(), s.getServiceDescription(), s.getServiceName());
    }

    public ServiceProfile saveServiceProfile(ServiceProfile serviceProfile,  List<Pricing> pricingList) {
        if (pricingList != null){
            pricingRepository.saveAll(pricingList);
        }
        return serviceProfileRepository.save(serviceProfile);
    }

    public List<Pricing> getAllPricingsByServiceId(int serviceId) {
        return serviceProfileRepository.findPricingsByServiceId(serviceId);
    }

    public List<Review> getAllReviewsByServiceId(int serviceId) {
        return serviceProfileRepository.findReviewsByServiceId(serviceId);
    }

    public List<ServiceProfile> getServiceList(int userId) {
        return serviceProfileRepository.findServiceProfilesByUserId(userId);
    }
}
