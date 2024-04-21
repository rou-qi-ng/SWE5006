package com.example.beautyApp.facade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.beautyApp.manager.ReviewManager;
import com.example.beautyApp.manager.ServiceProfileManager;
import com.example.beautyApp.model.Portfolio;
import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.model.Review;
import com.example.beautyApp.model.ServiceProfile;

import java.util.List;
import java.util.Optional;

@Component
public class ServiceFacade {

    private ServiceProfileManager serviceProfileManager;

    private ReviewManager reviewManager;


    public List<Portfolio> getAllImagesByServiceId(int serviceId) {
        return serviceProfileManager.getAllImagesByServiceId(serviceId);
    }

    public List<Portfolio> getFirstLogoByServiceId(int serviceId) {
        return serviceProfileManager.getFirstLogoByServiceId(serviceId);
    }

    public List<Portfolio> getPortfolioImagesByServiceId(int serviceId) {
        return serviceProfileManager.getPortfolioImagesByServiceId(serviceId);
    }

    public List<Pricing> getAllPricingsByServiceId(int serviceId) {
        return serviceProfileManager.getAllPricingsByServiceId(serviceId);
    }

    public List<Review> getAllReviewsByServiceId(int serviceId) {
        return serviceProfileManager.getAllReviewsByServiceId(serviceId);
    }
    
    public Optional<ServiceProfile> getServiceProfileById(int serviceId) {
        return serviceProfileManager.getServiceProfileById(serviceId);
    }

    public void saveReview(Review reviewData) {
        reviewManager.save(reviewData);
    }

}
