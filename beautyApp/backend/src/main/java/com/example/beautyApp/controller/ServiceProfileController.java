package com.example.beautyApp.controller;

import com.example.beautyApp.manager.ServiceProfileManager;
import com.example.beautyApp.model.Pricing;
import com.example.beautyApp.model.Review;
import com.example.beautyApp.model.ServiceProfile;
import com.example.beautyApp.model.TB_User;
import com.example.beautyApp.request.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
// import java.util.List;

@RestController
@RequestMapping("/api/serviceProfile")
@CrossOrigin(origins = "*")
public class ServiceProfileController {

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
    
    @GetMapping("/type/{serviceType}")
    public ResponseEntity<ServiceProfile> getServiceProfileByType(@PathVariable("serviceType") String serviceType) {
        Optional<ServiceProfile> serviceProfile = serviceProfileManager.getServiceProfileByType(serviceType);
        if (serviceProfile.isPresent()) {
            return ResponseEntity.ok(serviceProfile.get());

    @GetMapping("/{serviceId}/pricing")
    public ResponseEntity<List<Pricing>> getAllPricingsByServiceId(@PathVariable("serviceId") int serviceId) {
        List<Pricing> pricings = serviceProfileManager.getAllPricingsByServiceId(serviceId);
        if (!pricings.isEmpty()) {
            return ResponseEntity.ok(pricings);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping(path = "/search")
    public ResponseEntity<List<ServiceProfile>> search(@RequestBody ServiceProfile s) throws Exception {
        List<ServiceProfile> serviceProfile = serviceProfileManager.search(s.getType(), s.getName());
        System.out.println("serviceType: " + s.getType());
        System.out.println("serviceName: " +  s.getName());
        System.out.println(serviceProfile);
        if (!serviceProfile.isEmpty()) {
            return ResponseEntity.ok(serviceProfile);
    
    @GetMapping("/{serviceId}/review")
    public ResponseEntity<List<Review>> getAllReviewsByServiceId(@PathVariable("serviceId") int serviceId) {
        List<Review> reviews = serviceProfileManager.getAllReviewsByServiceId(serviceId);
        if (!reviews.isEmpty()) {
            return ResponseEntity.ok(reviews);
        } else {
            return ResponseEntity.ok(null);
        }
    }
}