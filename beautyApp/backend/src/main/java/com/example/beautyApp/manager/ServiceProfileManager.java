package com.example.beautyApp.manager;

import com.example.beautyApp.model.*;
import com.example.beautyApp.repository.*;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.transaction.annotation.Transactional;
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
    private PortfolioRepository portfolioRepository;

    @Autowired
    private ReviewRepository reviewRepository;
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
        ServiceProfile newService  = serviceProfileRepository.save(serviceProfile);
        log.info(String.valueOf(newService));
        if (pricingList != null){
            for (Pricing price : pricingList ){
                if (price.getPricingName() != "" && price.getPricingName() !=null ){
                    price.getServiceProfile().setServiceId(newService.getServiceId());
//                    log.info(String.valueOf(price));
                    Integer lastPriceId= pricingRepository.findLastPrice().getPricingId();
                    price.getServiceProfile().setServiceId(newService.getServiceId());

                    price.setPricingId(lastPriceId + 1);
                    log.info(String.valueOf(price));
//                    TB_User saveUser = userRepository.save(preSaveUser);
                    pricingRepository.save(price);
                }
                else{
                    System.out.println("this was skipped");
                    log.info(String.valueOf(price));
                }


            }

        }
        return newService;
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

    @Transactional
    public void deleteService(int userId, int serviceId) {
        BusinessId businessId = new BusinessId(userId, serviceId);
        Optional<ServiceProfile> newService  = serviceProfileRepository.findByServiceId(serviceId);
//        newService.setServiceId(newService.getServiceId());

        log.info("rches here");
        availabilityRepository.deleteByAvailabilityServiceId(serviceId);
        log.info("done1");
        businessRepository.deleteById(businessId);
        log.info("done2");
        portfolioRepository.deleteByServiceId(serviceId);
        log.info("done3");
        if (newService.isPresent()){
            reviewRepository.deleteByServiceProfile(newService.get());
            log.info("done4");

            pricingRepository.deleteByServiceProfile(newService.get());
            log.info("done5");
        }

        serviceProfileRepository.deleteById(serviceId);
        log.info("done");
    }
}
