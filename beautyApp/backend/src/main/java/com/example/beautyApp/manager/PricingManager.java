package com.example.beautyApp.manager;

import com.example.beautyApp.model.Availability;
import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.repository.PricingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
// import java.util.Optional;

@Service
public class PricingManager {
    @Autowired
    private PricingRepository pricingRepository;

    // public List<Pricing> getAllPricings() {
    //     return pricingRepository.findAll();
    // }

     public List<Pricing> getAllPricingsByServiceId(int serviceId) {
        return pricingRepository.findByPricingServiceId(serviceId);
    }
}
