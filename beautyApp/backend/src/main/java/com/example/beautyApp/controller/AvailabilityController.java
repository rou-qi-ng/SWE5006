package com.example.beautyApp.controller;

import com.example.beautyApp.manager.AvailabilityManager;
import com.example.beautyApp.model.Availability;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/serviceProfile")
@CrossOrigin(origins = "*")
public class AvailabilityController {

    @Autowired
    private AvailabilityManager availabilityManager;

    // @GetMapping // Handles GET requests to /api/availability
    // public ResponseEntity<List<Availability>> getAllAvailabilitys() {
    //     // Retrieves all service profiles from the manager
    //     List<Availability> availabilitys = availabilityManager.getAllAvailabilitys();
    //     // Returns the retrieved service profiles in the response with HTTP status 200 (OK)
    //     return ResponseEntity.ok(availabilitys);
    // }


    @GetMapping("/{serviceId}/availability")
    public ResponseEntity<List<Availability>> getAvailabilitiesById(@PathVariable("serviceId") int serviceId) {
        List<Availability> availabilities = availabilityManager.getAvailabilitiesById(serviceId);
        if (!availabilities.isEmpty()) {
            return ResponseEntity.ok(availabilities);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}