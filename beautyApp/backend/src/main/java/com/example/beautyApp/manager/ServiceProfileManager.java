package com.example.beautyApp.manager;

import com.example.beautyApp.controller.ServiceProfileController;
import com.example.beautyApp.model.*;
import com.example.beautyApp.repository.AvailabilityRepository;
import com.example.beautyApp.repository.BusinessRepository;
import com.example.beautyApp.repository.PricingRepository;
import com.example.beautyApp.repository.ServiceProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    @Autowired
    private BusinessRepository businessRepository;
    @Autowired
    private final AvailabilityRepository availabilityRepository;

    private static final Logger log = LoggerFactory.getLogger(ServiceProfileManager.class);

    public ServiceProfileManager(AvailabilityRepository availabilityRepository) {
        this.availabilityRepository = availabilityRepository;
    }


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

    public void deleteService(int userId, int serviceId) {
        BusinessId businessId = new BusinessId(userId, serviceId);
        availabilityRepository.deleteByAvailabilityServiceId(serviceId);
        log.info("done");
        businessRepository.deleteById(businessId);
        log.info("done");
        serviceProfileRepository.deleteById(serviceId);
        log.info("done");
    }
}
