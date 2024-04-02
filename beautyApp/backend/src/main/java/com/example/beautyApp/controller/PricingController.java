package com.example.beautyApp.controller;

import com.example.beautyApp.manager.PricingManager;
import com.example.beautyApp.model.Pricing;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/serviceProfile")
@CrossOrigin(origins = "*")
public class PricingController {

    @Autowired
    private PricingManager pricingManager;

    // @GetMapping // Handles GET requests to /api/pricing
    // public ResponseEntity<List<Pricing>> getAllPricings() {
    //     // Retrieves all service profiles from the manager
    //     List<Pricing> pricings = pricingManager.getAllPricings();
    //     // Returns the retrieved service profiles in the response with HTTP status 200 (OK)
    //     return ResponseEntity.ok(pricings);
    // }


    @GetMapping("/{serviceId}/pricing")
    public ResponseEntity<List<Pricing>> getAllPricingsByServiceId(@PathVariable("serviceId") int serviceId) {
        List<Pricing> pricings = pricingManager.getAllPricingsByServiceId(serviceId);
        if (!pricings.isEmpty()) {
            return ResponseEntity.ok(pricings);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}