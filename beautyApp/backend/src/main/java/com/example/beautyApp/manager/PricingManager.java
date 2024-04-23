package com.example.beautyApp.manager;

import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.model.ServiceProfile;
import com.example.beautyApp.repository.PricingRepository;
import com.example.beautyApp.repository.ServiceProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PricingManager {
    @Autowired
    private PricingRepository pricingRepository;
    @Autowired
    private ServiceProfileRepository serviceProfileRepository;

    public void saveAllPricing(List<Pricing> pricingList) {
//        for (Pricing pricing : pricingList) {
//            ServiceProfile serviceProfile = serviceProfileRepository.findByServiceId(pricing.getServiceProfile());
//            pricing.setServiceProfile(serviceProfile);
//        }
        pricingRepository.saveAll(pricingList);
    }

    @Transactional
    public void deletePricing(int pricingId) {
        pricingRepository.deleteById(pricingId);
    }

    @Transactional
    public void updatePricing(Pricing pricing) {
        Pricing existingPricing = pricingRepository.findById(pricing.getPricingId()).orElse(null);
        if (existingPricing == null) {
            return;
        }
        existingPricing.setPricingName(pricing.getPricingName());
        existingPricing.setPricingCost(pricing.getPricingCost());
        existingPricing.setPricingAddon(pricing.getPricingAddon());
        pricingRepository.save(existingPricing);
    }
}
