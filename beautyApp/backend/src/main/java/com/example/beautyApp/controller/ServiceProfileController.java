package com.example.beautyApp.controller;

import com.example.beautyApp.model.ServiceProfileWithPricing;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.beautyApp.manager.ServiceProfileManager;
import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.model.Review;
import com.example.beautyApp.model.ServiceProfile;
import com.example.beautyApp.model.TB_User;
import com.example.beautyApp.request.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
// import java.util.List;

@RestController
@RequestMapping("/api/serviceProfile")
@CrossOrigin(origins = "http://localhost:4200")
public class ServiceProfileController {
    private static final Logger log = LoggerFactory.getLogger(ServiceProfileController.class);

    @Autowired
    private ServiceProfileManager serviceProfileManager;

    // @GetMapping // Handles GET requests to /api/serviceProfile
    // public ResponseEntity<List<ServiceProfile>> getAllServiceProfiles() {
    //     // Retrieves all service profiles from the manager
    //     List<ServiceProfile> serviceProfiles = serviceProfileManager.getAllServiceProfiles();
    //     // Returns the retrieved service profiles in the response with HTTP status 200 (OK)
    //     return ResponseEntity.ok(serviceProfiles);
    // }

    @GetMapping("/{serviceId}")
    public ResponseEntity<ServiceProfile> getServiceProfileById(@PathVariable("serviceId") int serviceId) {
        Optional<ServiceProfile> serviceProfile = serviceProfileManager.getServiceProfileById(serviceId);
        if (serviceProfile.isPresent()) {
            return ResponseEntity.ok(serviceProfile.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/find")
    public ResponseEntity<Optional<ServiceProfile>> findServiceId(@RequestBody ServiceProfile serviceProfile) {
        Optional<ServiceProfile> serviceProfile2 = serviceProfileManager.findServiceId(serviceProfile);
        if (serviceProfile2.isPresent()) {
            return new ResponseEntity<>(serviceProfile2, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // Endpoint to insert a new service profile
    @PostMapping("/add")
    public ResponseEntity<ServiceProfile> addServiceProfile(@RequestBody ServiceProfileWithPricing combinedData) {
        ServiceProfile serviceProfile = combinedData.getServiceProfile();
        List<Pricing> pricingList = new ArrayList<>();
        for (Pricing pricing : pricingList) {
            pricing.setServiceProfile(serviceProfile);
        }
        log.info("Received new service profile: {}", combinedData.toString());
        log.info("Received new service profile: {}", serviceProfile);
        log.info("Received new service profile pricing: {}", pricingList);

        ServiceProfile savedServiceProfile = serviceProfileManager.saveServiceProfile(serviceProfile, pricingList);
        if (savedServiceProfile != null) {
            return new ResponseEntity<>(savedServiceProfile, HttpStatus.CREATED);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/{serviceId}/pricing")
    public ResponseEntity<List<Pricing>> getAllPricingsByServiceId(@PathVariable("serviceId") int serviceId) {
        List<Pricing> pricings = serviceProfileManager.getAllPricingsByServiceId(serviceId);
        if (!pricings.isEmpty()) {
            return ResponseEntity.ok(pricings);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{serviceId}/review")
    public ResponseEntity<List<Review>> getAllReviewsByServiceId(@PathVariable("serviceId") int serviceId) {
        List<Review> reviews = serviceProfileManager.getAllReviewsByServiceId(serviceId);
        if (!reviews.isEmpty()) {
            return ResponseEntity.ok(reviews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getServiceList")
    public ResponseEntity<List<ServiceProfile>> getServiceList(@RequestBody int userId) {
        List<ServiceProfile> serviceProfile = serviceProfileManager.getServiceList(userId);
        if (!serviceProfile.isEmpty()) {
            return new ResponseEntity<>(serviceProfile, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}