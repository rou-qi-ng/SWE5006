package com.example.beautyApp.manager;

import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.repository.PricingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PricingManager {
    @Autowired
    private PricingRepository pricingRepository;

    public void saveAllPricing(List<Pricing> pricingList) {
        pricingRepository.saveAll(pricingList);
    }
}
