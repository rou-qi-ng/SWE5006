package com.example.beautyApp.controller;

import com.example.beautyApp.facade.ServiceFacade;
import com.example.beautyApp.manager.ReviewManager;
import com.example.beautyApp.model.Review;
import com.example.beautyApp.model.ServiceProfile;
import com.example.beautyApp.repository.ServiceProfileRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/serviceProfile")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewManager reviewManager;

    @Autowired
    private ServiceProfileRepository serviceProfileRepository;

    private ServiceFacade serviceFacade;

    public ReviewController(ServiceFacade serviceFacade) {
        this.serviceFacade = serviceFacade;
    }

    // @GetMapping("/{serviceId}/review")
    // public ResponseEntity<List<Review>> getAvailabilitiesById(@PathVariable("serviceId") int serviceId) {
    //     List<Review> availabilities = reviewManager.getAvailabilitiesById(serviceId);
    //     if (!availabilities.isEmpty()) {
    //         return ResponseEntity.ok(availabilities);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // @GetMapping("/{serviceId}/review")
    // public ResponseEntity<List<Review>> getReviewsById(@PathVariable("serviceId") int serviceId) {
    //     List<Review> reviews = reviewManager.getReviewsById(serviceId);
    //     if (!reviews.isEmpty()) {
    //         return ResponseEntity.ok(reviews);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }


    @PostMapping("/{serviceId}/review/new")
    public ResponseEntity<?> addReview(@PathVariable("serviceId") int serviceId, @RequestBody Review reviewData) {
        try {
            Optional<ServiceProfile> serviceProfileOptional = serviceFacade.getServiceProfileById(serviceId);
            if (serviceProfileOptional.isPresent()) {
                ServiceProfile serviceProfile = serviceProfileOptional.get();
                reviewData.setServiceProfile(serviceProfile);
                serviceFacade.saveReview(reviewData);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build(); // Return 404 if service profile not found
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}